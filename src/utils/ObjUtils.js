

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

    static removeKeys(obj1, keys) {
        for (let key of keys) {
            delete obj1[key];
        }
    }

    static replaceEntry(obj, key, newValue) {
        var oldValue = obj[key];

        obj[key] = newValue;
        return oldValue;
    }

    static clone(obj, keys) {
        var clone = {};

        if (!obj) { return clone; }
        Object.keys(obj).map((key) => {
            if (!keys || keys.indexOf(key) == -1) {
                clone[key] = obj[key];
            }
        });
        return clone;
    }

    static typeOf(obj) {
        return typeof obj;
    }

}
