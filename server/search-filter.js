


module.exports = function(text) {
    const regex = new RegExp(text, "i");
    return function(targetSearch) {
        return regex.test(targetSearch);
    }
};