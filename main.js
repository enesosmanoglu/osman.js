String.prototype.escapeUnicode = function () {
    return this.replace(/\\\\u([0-9a-f]{4})/g, (whole, group1) => String.fromCharCode(parseInt(group1, 16)))
}
String.prototype.getBetweenAll = function () {
    let queries = Array.from(arguments)
    let result = text.split(queries.shift()).slice(1).map(i => { if (!queries.length) return i.escapeUnicode(); return (queries.length > 1 ? queries.reduce((a, b) => i.split(a)[0].split(b)[0]) : i.split(queries[0])[0]).escapeUnicode() })
    return result
    /* 
    if (groupEveryX) {
        let groups = []
        for (let i = 0; i < result.length; i++) {
            let group = []
            for (let j = 0; j < groupEveryX; j++) {
                group.push((result[i++]).escapeUnicode())
            }
            groups.push(group)
            i--;
        }
        return groups
    } else {
        return result
    } */
}
String.prototype.getBetween = function () {
    return this.getBetweenAll(arguments)
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

Array.prototype.unique = function () {
    return this.filter((v, i, a) => a.indexOf(v) == i)
}

Array.prototype.clean = function () {
    return this.filter(a => a != undefined && a != null)
}
