var homoglyph = require(`homoglyph-search`);
const mysql = require(`mysql`);

module.exports = Symphony;
function Symphony(config, bannedWords) {
    this.version = `0.0.1`;
    this.bannedWords = bannedWords;
    this.db = mysql.createPool({
        connectionLimit: 10,
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    });
}
Symphony.prototype.ver = function () {
    return this.version;
}
Symphony.prototype.similarity = function (input, banned, freedom = 1) {
    let words = input.slice().split(' ');
    words.forEach((word) => {
        // console.log(this.homoglyph(word));
        if (this.homoglyph(word)[0]) {
            // console.log(this.homoglyph(word)[0].word);
            if (banned !== ``) {
                console.log(this.homoglyph(word)[0].word)
                banned.forEach((target) => {
                    result = this.isSimilar(this.homoglyph(word)[0].word, target, freedom);
                    console.log(`'${word}' similar to '${target}' with ${freedom} degrees of freedom? ${result}`)

                });
            }
        }
    })
}
Symphony.prototype.homoglyph = function (input) {
    return homoglyph.search(input, this.bannedWords);
}
Symphony.prototype.isSimilar = function (word, target, freedom = 0) {
    function difference(arr1, arr2, start1 = 0, start2 = 0) {
        if (start1 === arr1.length && start2 === arr2.length) {
            return 0;
        } else if (start1 < arr1.length && start2 < arr2.length) {
            if (arr1[start1] === arr2[start2]) {
                return difference(arr1, arr2, start1 + 1, start2 + 1)
            } else {
                return Math.min(
                    1 + difference(arr1, arr2, start1 + 1, start2 + 1),
                    1 + difference(arr1, arr2, start1 + 1, start2),
                    1 + difference(arr1, arr2, start1, start2 + 1)
                )

            }
        } else if (start1 < arr1.length) {
            return 1 + difference(arr1, arr2, start1 + 1, start2)
        } else {
            return 1 + difference(arr1, arr2, start1, start2 + 1)
        }
    }
    const diff = difference(Array.from(word.toLowerCase()), Array.from(target.toLowerCase()))
    return diff <= freedom
}
Symphony.prototype.sqlInsert = function (load, sql) {
    let query = this.db.query(sql, load, (err, result) => {
        if (err) throw err;
    });
}