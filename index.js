// STRING
String.prototype.escapeUnicode = function () {
    return this.replace(/\\\\u([0-9a-f]{4})/g, (whole, group1) => String.fromCharCode(parseInt(group1, 16)));
};
String.prototype.escapeRegExp = function () {
    return this.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
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
};
String.prototype.replaceEnd = function (...args) {
    return this.reverse().replace(...args.map(s => typeof s == "string" ? s.reverse() : s)).reverse();
};
String.prototype.toInt = function (radix) {
    return parseInt(this, radix);
};

// OBJECT
Object.prototype._find = function (predicate) {
    for (var i = 0; i < Object.keys(this).length; i++) {
        try {
            if (predicate === Object.keys(this)[i] || predicate(Object.keys(this)[i], this[Object.keys(this)[i]], this))
                return this;
        } catch (err) { }

        if (typeof this[Object.keys(this)[i]] == "object") {
            var o = Object.assign({}, this[Object.keys(this)[i]]).find(predicate);
            if (o != null)
                return o;
        }
    }

    return undefined;
};
Object.prototype.findAll = function (key) {
    try {
        return JSON.stringify(this).split(`"${key}"`).slice(1).map(t => t.split("}")[0].split(`,"`)[0].replace(":", "")).map(v => eval(v));
    } catch (err) { }

    return undefined;
};
Object.prototype.find = function (key) {
    try {
        return this.findAll(key)[0]
    } catch (err) { }

    return undefined;
};
Object.prototype.map = function (cb) {
    let obj = this;
    return Object.fromEntries(Object.keys(obj).map((key, i, a, value = obj[key]) => [key, cb(value, key, obj, i)]));
};
Object.prototype.mapValue = Object.prototype.map;
Object.prototype.mapKey = function (cb) {
    let obj = this;
    return Object.fromEntries(Object.keys(obj).map((key, i, a, value = obj[key]) => [cb(value, key, obj, i), value]));
};
Object.prototype.mapKeyValue = function (cb) {
    let obj = this;
    return Object.fromEntries(Object.keys(obj).map((key, i, a, value = obj[key]) => cb(value, key, obj, i)));
};
Object.prototype.copyBasic = function () {
    return {...this};
};
Object.prototype.copyJSON = function () {
    return JSON.parse(JSON.stringify(this));
};
Object.prototype.randomKey = function () {
    return Math.floor((Math.random() * Object.keys(this).length));
};
Object.prototype.random = function () {
    return this[this.randomKey()];
};
Object.prototype.randomValue = Object.prototype.random;

// ARRAY
Array.prototype.unique = function () {
    return this.filter((v, i, a) => a.indexOf(v) == i);
};
Array.prototype.valid = function () {
    return this.filter(a => a != undefined && a != null);
};
Array.prototype.trueItems = function () {
    return this.filter(a => a);
};
Array.prototype.falseItems = function () {
    return this.filter(a => !a);
};
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};
Array.prototype.shuffled = function () {
    let array = Array.from(this);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
Array.prototype.insert = function (index, ...values) {
    this.splice(index, 0, ...values);
    return this;
};
Array.prototype.pushIn = function (index, ...values) {
    this.splice(index + 1, 0, ...values);
    return this.length;
};
Array.prototype.removeIndex = function (i) {
    return this.splice(i, 1);
};
Array.prototype.removeIndexes = function (...args) {
    let result = [];
    args.sort();
    args.forEach((v, i, a) => {
        result.push(this.splice(v - i, 1)); // The indexes will be shifted once after each deletion, so we need to reduce the indexes for each deletion count.
    });
    return result.flat();
};
Array.prototype.remove = function (...args) {
    return this.removeIndexes(...args.map(e => this.findIndex(v => v == e)).filter(i => i != -1));
};
Array.prototype.removeFilter = function (fn) {
    return this.remove(...this.filter(fn));
};
Array.prototype.removeFind = function (fn) {
    return this.remove(this.find(fn));
};
Array.prototype.swapIndexes = function (i, j) {
    [this[i], this[j]] = [this[j], this[i]];
    return this;
};
Array.prototype.swap = function (v1, v2) {
    let i = this.findIndex(v => v == v1);
    let j = this.findIndex(v => v == v2);
    if (i != -1 && j != -1)
        this.swapIndexes(i, j);
    return this;
};
Array.prototype.swapFind = function (f1, f2) {
    let i = this.findIndex(f1);
    let j = this.findIndex(f2);
    if (i != -1 && j != -1)
        this.swapIndexes(i, j);
    return this;
};
Array.prototype.randomIndex = function () {
    return Math.floor((Math.random() * this.length));
};
Array.prototype.random = function () {
    return this[this.randomIndex()];
};
Array.prototype.copyBasic = function () {
    return [...this];
};
Array.prototype.copyJSON = function () {
    return JSON.parse(JSON.stringify(this));
};

let arr = (count, value) => new Array(~~count).fill(value);
let arrMap = (count, fn) => arr(count).map(fn);
let arrMerge = (...arrs) => [].concat(...arrs);
function arrDeepMerge(array, a = []) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (typeof (element) == "object" && element.push != undefined) {
            a = arrDeepMerge(element, a);
        } else {
            a.push(element);
        }
    }
    return a;
}
let arrNum = (start, end) => arrMap(end - start + 1, (v, i, a) => (start - 1) + (i + 1));
let arrNumGrid = (start, end, divide) => arr(Math.ceil((end - start + 1) / divide)).map((v, i, a) => arrNum(start + i * divide, start + i * divide + divide - 1)).map(a => a.map(n => n <= end ? n : null).filter(n => n))
let arrNumGridCenter = (start, end, divide) => arrNumGrid(start, end, divide).map(a => a.length == divide ? a : (arrMerge(arr((divide - a.length) / 2), ...a, arr((divide - a.length) / 2))))//.map(a => a.length == divide ? a : a.concat(undefined))

Array.new = arr;
Array.newMap = arrMap;
Array.merge = arrMerge;
Array.deepMerge = arrDeepMerge;
Array.newNum = arrNum;
Array.newNumGrid = arrNumGrid;
Array.newNumGridCenter = arrNumGridCenter;