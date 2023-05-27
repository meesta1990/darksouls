import { idNodeGraph, NodeGraph } from "../../../entities/Node";
export class NodeMap {
    nodeMap: NodeGraph[] = [];

    constructor() {
        const createNode = (id: idNodeGraph) => {
            const newNode: NodeGraph = {
                id: id,
                adjacentNodes: {},
                entitiesInTheNode: [],
                coordinates: [-1, -1, -1]
            };
            this.nodeMap[id] = newNode;
            return newNode;
        }

        const node0 = createNode(0);
        const node1 = createNode(1);
        const node2 = createNode(2);
        const node3 = createNode(3);
        const node4 = createNode(4);
        const node5 = createNode(5);
        const node6 = createNode(6);
        const node7 = createNode(7);
        const node8 = createNode(8);
        const node9 = createNode(9);
        const node10 = createNode(10);
        const node11 = createNode(11);
        const node12 = createNode(12);

        node0.adjacentNodes.right = 1;
        node0.adjacentNodes.bottom = 5;
        node0.adjacentNodes.bottomRight = 3;
        node0.coordinates = [0.7, 0.12, -5.3];

        node1.adjacentNodes.left = 0;
        node1.adjacentNodes.right = 2;
        node1.adjacentNodes.bottom = 6;
        node1.adjacentNodes.bottomLeft = 3;
        node1.adjacentNodes.bottomRight = 4;
        node1.coordinates = [3, 0.12, -5.3];

        node2.adjacentNodes.left = 1;
        node2.adjacentNodes.bottom = 7;
        node2.adjacentNodes.bottomLeft = 4;
        node2.coordinates = [5.3, 0.12, -5.3];

        node3.adjacentNodes.topLeft = 0;
        node3.adjacentNodes.topRight = 1;
        node3.adjacentNodes.right = 4;
        node3.adjacentNodes.bottom = 8;
        node3.adjacentNodes.bottomLeft = 5;
        node3.adjacentNodes.bottomRight = 6;
        node3.coordinates = [1.85, 0.12, -4.15];

        node4.adjacentNodes.topLeft = 1;
        node4.adjacentNodes.topRight = 2;
        node4.adjacentNodes.left = 3;
        node4.adjacentNodes.bottom = 9;
        node4.adjacentNodes.bottomLeft = 6;
        node4.adjacentNodes.bottomRight = 7;
        node4.coordinates = [4.15, 0.12, -4.15];

        node5.adjacentNodes.top = 0;
        node5.adjacentNodes.topRight = 3;
        node5.adjacentNodes.right = 6;
        node5.adjacentNodes.bottomRight = 8;
        node5.adjacentNodes.bottom = 10;
        node5.coordinates = [0.7, 0.12, -3];

        node6.adjacentNodes.top = 1;
        node6.adjacentNodes.topLeft = 3;
        node6.adjacentNodes.topRight = 4;
        node6.adjacentNodes.left = 5;
        node6.adjacentNodes.right = 7;
        node6.adjacentNodes.bottomLeft = 8;
        node6.adjacentNodes.bottomRight = 9;
        node6.adjacentNodes.bottom = 11;
        node6.coordinates = [3, 0.12, -3];

        node7.adjacentNodes.top = 2;
        node7.adjacentNodes.topLeft = 4;
        node7.adjacentNodes.left = 6;
        node7.adjacentNodes.bottomLeft = 9;
        node7.adjacentNodes.bottom = 12;
        node7.coordinates = [5.3, 0.12, -3];

        node8.adjacentNodes.topLeft = 5;
        node8.adjacentNodes.topRight = 6;
        node8.adjacentNodes.top = 3;
        node8.adjacentNodes.right = 9;
        node8.adjacentNodes.bottomLeft = 10;
        node8.adjacentNodes.bottomRight = 1;
        node8.coordinates = [1.85, 0.12, -1.85];

        node9.adjacentNodes.topLeft = 6;
        node9.adjacentNodes.topRight = 7;
        node9.adjacentNodes.top = 4;
        node9.adjacentNodes.left = 8;
        node9.adjacentNodes.bottomLeft = 11;
        node9.adjacentNodes.bottomRight = 12;
        node9.coordinates = [4.15, 0.12, -1.85];

        node10.adjacentNodes.top = 5;
        node10.adjacentNodes.topRight = 8;
        node10.adjacentNodes.right = 11;
        node10.coordinates = [0.7, 0.12, -0.7];

        node11.adjacentNodes.topLeft = 8;
        node11.adjacentNodes.topRight = 9;
        node11.adjacentNodes.top = 6;
        node11.adjacentNodes.left = 10;
        node11.adjacentNodes.right = 12;
        node11.coordinates = [3, 0.12, -0.7];

        node12.adjacentNodes.top = 7;
        node12.adjacentNodes.topLeft = 9;
        node12.adjacentNodes.left = 11;
        node12.coordinates = [5.3, 0.12, -0.7];
    }

    getNodeMap = () => {
        return this.nodeMap;
    }
}