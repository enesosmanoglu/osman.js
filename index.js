// STRING
String.prototype.escapeUnicode = function () {
    return this.replace(/\\\\u([0-9a-f]{4})/g, (whole, group1) => String.fromCharCode(parseInt(group1, 16)));
}
String.prototype.getBetweenAll = function () {
    let queries = Array.from(arguments);
    queries = queries.map(s => s.replace(/\[/g, "\\["));
    let result = Array.from(this.match(new RegExp(`(?<=${queries[0]})(.*?)(?=\s*${queries[1]})`, "g")));
    return result;
}
String.prototype.getBetween = function () {
    return this.getBetweenAll(...arguments)[0];
}
String.prototype.padCenter = function (maxLength, fillString = " ") {
    return this.padStart(this.length + Math.floor((maxLength - this.length) / 2), fillString).padEnd(maxLength, fillString);
}

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
}
Object.prototype.findAll = function (key) {
    try {
        return JSON.stringify(this).split(`"${key}"`).slice(1).map(t => t.split("}")[0].split(`,"`)[0].replace(":", "")).map(v => eval(v));
    } catch (err) { }

    return undefined;
}
Object.prototype.find = function (key) {
    try {
        return this.findAll(key)[0]
    } catch (err) { }

    return undefined;
}
Object.prototype.map = function (cb) {
    return Object.fromEntries(Object.keys(this).map((v, i, a) => [v, cb(this[v], v, this)]));
}
Object.prototype.mapValue = Object.prototype.map;
Object.prototype.mapKey = function (cb) {
    return Object.fromEntries(Object.keys(this).map((v, i, a) => [cb(this[v], v, this), this[v]]));
}
Object.prototype.mapKeyValue = function (cb) {
    return Object.fromEntries(Object.keys(this).map((v, i, a) => cb(this[v], v, this)));
}

// ARRAY
Array.prototype.unique = function () {
    return this.filter((v, i, a) => a.indexOf(v) == i);
}
Array.prototype.clear = function () {
    this = this.filter(a => a != undefined && a != null);
    return this;
}
Array.prototype.clean = function () {
    return this.filter(a => a != undefined && a != null);
}
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
}
Array.prototype.shuffled = function () {
    let array = Array.from(this);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}