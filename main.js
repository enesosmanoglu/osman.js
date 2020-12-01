exports.getSectionsBetween = (text, queries, groupEveryX = 0) => {
    function escapeUnicode(text) {
        return text.replace(/\\\\u([0-9a-f]{4})/g, (whole, group1) => String.fromCharCode(parseInt(group1, 16)))
    }
    let result = text.split(queries.shift()).slice(1).map(i => { if (!queries.length) return escapeUnicode(i); return escapeUnicode(queries.length > 1 ? queries.reduce((a, b) => i.split(a)[0].split(b)[0]) : i.split(queries[0])[0]) })

    if (groupEveryX) {
        let groups = []
        for (let i = 0; i < result.length; i++) {
            let group = []
            for (let j = 0; j < groupEveryX; j++) {
                group.push(escapeUnicode(result[i++]))
            }
            groups.push(group)
            i--;
        }
        return groups
    } else {
        return result
    }
}

/**
 * Same as Array.prototype.find but for all objects :)
 * @param {Function} predicate Function( key:string, value:any, object:Object)
 */
Object.prototype.find = function (predicate) {
    for (var i = 0; i < Object.keys(this).length; i++) {
        try {
            if (func(Object.keys(this)[i], this[Object.keys(this)[i]], this))
                return typeof this[Object.keys(this)[i]] == "object" ? this[Object.keys(this)[i]] : this;
        } catch (err) { }

        if (typeof this[Object.keys(this)[i]] == "object") {
            var o = Object.assign({}, this[Object.keys(this)[i]]).find(predicate);
            if (o != null)
                return o;
        }
    }

    return undefined;
}
