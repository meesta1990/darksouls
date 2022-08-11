export const cleanUndefinedField = (obj: any) => {
    if (obj) {
        for(let key in obj){
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] == "object")
                    cleanUndefinedField(obj[key]);
                else {
                    if (obj[key] === undefined) {
                        obj[key] = null;
                    }
                }
            }
        }
    }
    return deepCopy(obj);
}

export const cleanFunctionsField = (obj: any) => {
    if (obj) {
        for(let key in obj){
            if (obj.hasOwnProperty(key)) {
                if (obj[key] instanceof Function)
                    obj[key] = null;
            }
        }
    }
    return deepCopy(obj);
}

export const deepCopy : any= (obj: any) => {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj._isAMomentObject) {
        copy = obj.clone();
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
