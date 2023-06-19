import {IDoorPosition} from "../entities/Tile";
import {NodeGraph, SpecialNodes, VectorizedPosition} from "../entities/Node";
import {NodeMap} from "../components/Session/Board/MapNodeGraph";
import {Scene} from "three";
import PriorityQueue from "./PriorityQueue";

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

export const getNodePosition = (position: number, offsetX: number = 0, offsetY: number = 0): VectorizedPosition | undefined => {
    const nodeMap = new NodeMap().getNodeMap();
    const node = nodeMap.find((np) => np.id === position);
    if(node && node.coordinates) {
        return [node.coordinates[0] + offsetX, 0.12, node.coordinates[2] + offsetY]
    }
    return undefined;
}

export const compareVectorizedPosition = (pos1?: VectorizedPosition, pos2?: VectorizedPosition) => {
    if(pos1 && pos2) {
        return pos1[0] === pos2[0] && pos1[1] === pos2[1] && pos1[2] === pos2[2]
    } else {
        return pos1 === pos2;
    }
}

function calcolaDistanza(coordinata1: VectorizedPosition, coordinata2: VectorizedPosition): number {
    const distanzaX = coordinata1[0] - coordinata2[0];
    const distanzaY = coordinata1[1] - coordinata2[1];
    const distanzaZ = coordinata1[2] - coordinata2[2];

    return Math.sqrt(distanzaX ** 2 + distanzaY ** 2 + distanzaZ ** 2);
}
export const findNearestCoords = (coordinataDaCercare: VectorizedPosition, coordinate: VectorizedPosition[], howMany?: number): VectorizedPosition[] => {
    const distanze = coordinate.map((coordinata) => calcolaDistanza(coordinata, coordinataDaCercare));

    const coordinateSimili: VectorizedPosition[] = [];

    for (let i = 0; i < (howMany ?? 1); i++) {
        const minimaDistanzaIndex = distanze.indexOf(Math.min(...distanze));

        if (minimaDistanzaIndex !== -1) {
            coordinateSimili.push(coordinate[minimaDistanzaIndex]);
            distanze[minimaDistanzaIndex] = Infinity;
        } else {
            break; // Se non ci sono più coordinate disponibili, interrompi il ciclo
        }
    }

    return coordinateSimili;
};

export const findMeshById = (id: string, scene: Scene) => {
    if(scene) {
        return scene.getObjectByProperty('userData.id', id);

    }
    return null;
};

export const hashCode = (str: string) => {
    let hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

export const calculatePaths = (startNodeId: number, endNodeId: number, nodes: NodeGraph[]) => {
    const shortestDistance = calculateShortestDistance(startNodeId, endNodeId, nodes);

    const paths: number[][] = [];
    const queue: { nodeId: number; path: number[] }[] = [];

    queue.push({ nodeId: startNodeId, path: [startNodeId] });

    while (queue.length > 0) {
        const { nodeId, path } = queue.shift()!;

        if (nodeId === endNodeId && path.length - 1 === shortestDistance) {
            paths.push(path);
        }

        const currentNode = nodes.find((node) => node.id === nodeId);

        if (currentNode) {
            for (const [direction, adjacentNodeId] of Object.entries(currentNode.adjacentNodes)) {
                const newPath = [...path, adjacentNodeId];

                if (!path.includes(adjacentNodeId)) {
                    queue.push({ nodeId: adjacentNodeId, path: newPath });
                }
            }
        }
    }

    return paths;
};

const calculateShortestDistance = (startNodeId: number, endNodeId: number, nodes: NodeGraph[]) => {
    const distances: { [key: number]: number } = {};
    const visited: { [key: number]: boolean } = {};
    const predecessors: { [key: number]: number | null } = {};
    const priorityQueue = new PriorityQueue<number>();

    for (const node of nodes) {
        distances[node.id] = Infinity;
        visited[node.id] = false;
        predecessors[node.id] = null;
    }

    distances[startNodeId] = 0;
    priorityQueue.enqueue(startNodeId, 0);

    while (!priorityQueue.isEmpty()) {
        const currentNodeId = priorityQueue.dequeue();

        if (currentNodeId === endNodeId) {
            return distances[currentNodeId];
        }

        if (currentNodeId && !visited[currentNodeId]) {
            visited[currentNodeId] = true;
            const currentNode = nodes.find((node) => node.id === currentNodeId);

            if (currentNode) {
                for (const [direction, adjacentNodeId] of Object.entries(currentNode.adjacentNodes)) {
                    const cost = 1; // Costo del percorso tra nodi adiacenti (può essere personalizzato)
                    const tentativeDistance = distances[currentNodeId] + cost;

                    if (tentativeDistance < distances[adjacentNodeId]) {
                        distances[adjacentNodeId] = tentativeDistance;
                        predecessors[adjacentNodeId] = currentNodeId;
                        priorityQueue.enqueue(adjacentNodeId, tentativeDistance);
                    }
                }
            }
        }
    }

    return Infinity; // Nessun percorso trovato
};
