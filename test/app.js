const Symphony = require("..");
var bannedWords = [`polyphony`, `herp`];
const symphony = new Symphony(config, bannedWords);


let input = `derp the p0lyphony of greatest herp`;

console.log(symphony.similarity(input, bannedWords));
// let input = [['Cozy ducks', 'Caz sucks', 3]];
// console.log(symphony.ver());
// input.forEach((test) => {
//     const word = test[0];
//     const target = test[1];
//     const freedom = test[2];
//     const result = symphony.isSimilar(word, target, freedom);
//     console.log(`'${word}' similar to '${target}' with ${freedom} degrees of freedom? ${result}`)
// });