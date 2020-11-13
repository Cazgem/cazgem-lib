module.exports = Symphony;
function Symphony() {
    this.version = `0.0.1`;
}
Symphony.prototype.ver = function () {
    return this.version;
}