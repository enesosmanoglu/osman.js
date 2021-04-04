
Array.prototype.unique = function () {
    return this.filter((v, i, a) => a.indexOf(v) == i)
}


String.prototype.escapeUnicode = function () {
    return this.replace(/\\\\u([0-9a-f]{4})/g, (whole, group1) => String.fromCharCode(parseInt(group1, 16)))
}
String.prototype.getBetweenAll = function () {
    let queries = Array.from(arguments)
    queries = queries.map(s=>s.replace(/\[/g,"\\["))
    let result = Array.from(this.match(new RegExp(`(?<=${queries[0]})(.*?)(?=\s*${queries[1]})`, "g")))
    return result
}
String.prototype.getBetween = function () {
    return this.getBetweenAll(...arguments)[0]
}

/**
 * Same as Array.prototype.find but for all objects :)
 * @param {(string|Function)} predicate key || Function( key:string, value:any, object:Object)
 * @returns First object which contains provided key.
 * @returns First object which matches with provided function.
 */
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
        return JSON.stringify(this).split(`"${key}"`).slice(1).map(t => t.split("}")[0].split(`,"`)[0].replace(":", "")).map(v => eval(v))
    } catch (error) {

    }

    return undefined;
}
Object.prototype.find = function (key) {
    try {
        return this.findAll(key)[0]
    } catch (error) {

    }

    return undefined;
}

Array.prototype.clean = function () {
    return this.filter(a => a != undefined && a != null)
}

Object.prototype.map = function(cb) {
    return Object.fromEntries(Object.keys(this).map((v, i, a) => [v, cb(this[v], v, this)]));
}
Object.prototype.mapValue = Object.prototype.map;
Object.prototype.mapKey = function(cb) {
    return Object.fromEntries(Object.keys(this).map((v, i, a) => [cb(this[v], v, this), this[v]]));
}
Object.prototype.mapKeyValue = function(cb) {
    return Object.fromEntries(Object.keys(this).map((v, i, a) => cb(this[v], v, this)));
}
