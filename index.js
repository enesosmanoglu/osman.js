// STRING
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
    return { ...this };
};
Object.prototype.copyJSON = function () {
    return JSON.parse(JSON.stringify(this));
};
Object.defineProperty(Object.prototype, 'randomKey', {
    get: function () { return Object.keys(this)[Math.floor((Math.random() * Object.keys(this).length))]; }
});
Object.defineProperty(Object.prototype, 'random', {
    get: function () { return this[this.randomKey]; }
});
Object.defineProperty(Object.prototype, 'randomValue', {
    get: function () { return this[this.randomKey]; }
});
Object.prototype.allIntR = function (radix) {
    return this.map(v => parseInt(v, radix));
};
Object.defineProperty(Object.prototype, 'allInt', {
    get: function () { return this.map(v => parseInt(v)); }
});

// ARRAY
Object.defineProperty(Array.prototype, 'unique', {
    get: function () { return this.filter((v, i, a) => a.indexOf(v) == i); }
});
Object.defineProperty(Array.prototype, 'valid', {
    get: function () { return this.filter(v => v != undefined && v != null); }
});
Object.defineProperty(Array.prototype, 'trueItems', {
    get: function () { return this.filter(v => v); }
});
Object.defineProperty(Array.prototype, 'falseItems', {
    get: function () { return this.filter(v => !v); }
});
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};
Object.defineProperty(Array.prototype, 'shuffled', {
    get: function () { return Array.from(this).shuffle(); }
});
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
Object.defineProperty(Array.prototype, 'randomIndex', {
    get: function () { return Math.floor((Math.random() * this.length)); }
});
Object.defineProperty(Array.prototype, 'random', {
    get: function () { return this[this.randomIndex]; }
});
Array.prototype.copyBasic = function () {
    return [...this];
};
Array.prototype.copyJSON = function () {
    return JSON.parse(JSON.stringify(this));
};
Array.prototype.allIntR = function (radix) {
    return this.map(v => parseInt(v, radix));
};
Object.defineProperty(Array.prototype, 'allInt', {
    get: function () { return this.map(v => parseInt(v)); }
});
Object.defineProperty(Array.prototype, 'first', {
    get: function () { return this[0]; },
    set: function (v) { this[0] = v; }
});
Object.defineProperty(Array.prototype, 'last', {
    get: function () { return this[this.length - 1]; },
    set: function (v) { this[this.length - 1] = v; }
});

Array.new = (count, value) => new Array(~~count).fill(value);
Array.newMap = (count, fn) => Array.new(count).map(fn);
Array.merge = (...arrs) => [...arrs.flat()];
Array.flatMerge = (...arrs) => [...arrs.map(arr => arr.flat()).flat()];
Array.newNum = (start, end) => Array.newMap(end - start + 1, (v, i, a) => (start - 1) + (i + 1));
Array.newNumGrid = (start, end, divide) => Array.new(Math.ceil((end - start + 1) / divide)).map((v, i, a) => Array.newNum(start + i * divide, start + i * divide + divide - 1)).map(a => a.map(n => n <= end ? n : null).filter(n => n))
Array.newNumGridCenter = (start, end, divide) => Array.newNumGrid(start, end, divide).map(a => a.length == divide ? a : (Array.merge(Array.new((divide - a.length) / 2), ...a, Array.new((divide - a.length) / 2))))//.map(a => a.length == divide ? a : a.concat(undefined))