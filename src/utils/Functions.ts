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
    return obj;
}
