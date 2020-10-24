

export class ObjUtils {

    static findDiffKeys(obj1, obj2) {
        if (!obj1 || !obj2) {
            return {};
        }

        return Object.keys(obj1).filter(key => !obj2.hasOwnProperty(key)).reduce((result, current) => {
            result[current] = obj1[current];
            return result;
        }, {});
    }

    static replaceEntry(obj, key, newValue) {
        var oldValue = obj[key];

        obj[key] = newValue;
        return oldValue;
    }

    static clone(obj) {
        var clone = {};

        if (!obj) { return clone; }
        Object.keys(obj).map((key) => {
            clone[key] = obj[key];
        });
        return clone;
    }

}
