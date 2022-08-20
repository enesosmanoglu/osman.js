String.prototype.escapeUnicode = function () {
    return this.replace(/\\\\u([0-9a-f]{4})/g, (whole, group1) => String.fromCharCode(parseInt(group1, 16)));
};
String.prototype.escapeRegExp = function () {
    return this.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
Object.defineProperty(String.prototype, 'unicodeEscaped', {
    get: function () { return this.replace(/\\\\u([0-9a-f]{4})/g, (whole, group1) => String.fromCharCode(parseInt(group1, 16))); }
});
Object.defineProperty(String.prototype, 'regExpEscaped', {
    get: function () { return this.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
});
String.prototype.getBetweenAll = function (...args) {
    args = args.map(a => a.escapeRegExp());
    let result = Array.from(this.match(new RegExp(`(?<=${args[0]})(.*?)(?=\s*${args[1]})`, "g")));
    return result;
};
String.prototype.getBetween = function (...args) {
    return this.getBetweenAll(...args)[0];
};
String.prototype.padCenter = function (maxLength, fillString = " ") {
    return this.padStart(this.length + Math.floor((maxLength - this.length) / 2), fillString).padEnd(maxLength, fillString);
};
String.prototype.replaceAll = function (searchValue, replaceValue) {
    return this.replace(new RegExp(searchValue, "g"), replaceValue);
};
String.prototype.replaceAllWithArray = function (searchValue, replaceArray = []) {
    let str = this;
    let match = this.match(new RegExp(searchValue.escapeRegExp()));
    if (!match || !replaceArray.length) return str.toString();
    str = str.replace(searchValue, replaceArray.shift());
    return str.replaceAllWithArray(searchValue, replaceArray).toString();
};
String.prototype.format = function () {
    let str = this.toString();
    if (arguments.length) {
        let t = typeof arguments[0];
        let key;
        let args = ("string" === t || "number" === t) ? Array.prototype.slice.call(arguments) : arguments[0];
        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }
    return str;
};
String.prototype.reverse = function () {
    return this.split('').reverse().join('');
}
Object.defineProperty(String.prototype, 'reversed', {
    get: function () { return this.split('').reverse().join(''); }
});
String.prototype.replaceEnd = function (...args) {
    return this.reversed.replace(...args.map(s => typeof s == "string" ? s.reversed : s)).reversed;
};
String.prototype.toIntR = function (radix) {
    return parseInt(this, radix);
};
Object.defineProperty(String.prototype, 'toInt', {
    get: function () { return parseInt(this); }
});