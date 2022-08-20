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