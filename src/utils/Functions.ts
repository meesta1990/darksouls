import {IDoorPosition} from "../entities/Tile";
import {SpecialNodes, VectorizedPosition} from "../entities/Node";

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

export const getStrOppositeDoor = (relativePosition: IDoorPosition): IDoorPosition => {
    switch (relativePosition) {
        case "right":
            return "left"
        case "top":
            return "bottom"
        case "bottom":
            return "top"
        case "left":
            return "right"
    }

    return "top";
}

export const getDoorPosition = (relativePosition: IDoorPosition, invert?: boolean):
    { rotation: VectorizedPosition, position: VectorizedPosition } | null => {

    switch (relativePosition) {
        case "right":
            if (invert) {
                return {
                    rotation: [0, 89.54, 0],
                    position: [-0.4, 0.12, -3]
                }
            }
            return {
                rotation: [0, 89.54, 0],
                position: [6.4, 0.12, -3]
            }
        case "top":
            if (invert) {
                return {
                    rotation: [0, 0, 0],
                    position: [3, 0.12, 0.4]
                }
            }
            return {
                rotation: [0, 0, 0],
                position: [3, 0.12, -6.4]
            }
        case "bottom":
            if (invert) {
                return {
                    rotation: [0, 0, 0],
                    position: [3, 0.12, -6.4]
                }
            }
            return {
                rotation: [0, 0, 0],
                position: [3, 0.12, 0.4]
            }
        case "left":
            if (invert) {
                return {
                    rotation: [0, 89.54, 0],
                    position: [6.4, 0.12, -3]
                }
            }
            return {
                rotation: [0, 89.54, 0],
                position: [-0.4, 0.12, -3]
            }
    }

    return null;
}

export const getNodePosition = (position: number, offsetX: number = 0, offsetY: number = 0): [number, number, number] | undefined => {
    switch (position){
        case 0: return [1+offsetX, 0.12, -5+offsetY];
        case 1: return [3+offsetX, 0.12, -5+offsetY];
        case 2: return [5+offsetX, 0.12, -5+offsetY];
        case 3: return [2+offsetX, 0.12, -4+offsetY];
        case 4: return [4+offsetX, 0.12, -4+offsetY];
        case 5: return [0+offsetX, 0.12, -3+offsetY];
        case 6: return [3+offsetX, 0.12, -3+offsetY];
        case 7: return [5+offsetX, 0.12, -3+offsetY];
        case 8: return [2+offsetX, 0.12, -2+offsetY];
        case 9: return [4+offsetX, 0.12, -2+offsetY];
        case 10: return [1+offsetX, 0.12, -1+offsetY];
        case 11: return [3+offsetX, 0.12, -1+offsetY];
        case 12: return [5+offsetX, 0.12, -1+offsetY];
    }
    return undefined;
}