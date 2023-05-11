import { idNodeGraph, NodeGraph } from "../../../entities/Node";

export const nodeMap = {};

function createNode(id: idNodeGraph) {
    const newNode: NodeGraph = {
        id: id,
        adjacentNodes: {}
    };
    nodeMap[id] = newNode;
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

node0.adjacentNodes.right = node1;
node0.adjacentNodes.bottom = node5;
node0.adjacentNodes.bottomRight = node3;
node0.coordinates = [1, 0.12, -5];

node1.adjacentNodes.left = node0;
node1.adjacentNodes.right = node2;
node1.adjacentNodes.bottom = node6;
node1.adjacentNodes.bottomLeft = node3;
node1.adjacentNodes.bottomRight = node4;
node1.coordinates = [3, 0.12, -5];

node2.adjacentNodes.left = node1;
node2.adjacentNodes.bottom = node7;
node2.adjacentNodes.bottomLeft = node4;
node2.coordinates = [5, 0.12, -5];

node3.adjacentNodes.topLeft = node0;
node3.adjacentNodes.topRight = node1;
node3.adjacentNodes.right = node4;
node3.adjacentNodes.bottom = node8;
node3.adjacentNodes.bottomLeft = node5;
node3.adjacentNodes.bottomRight = node6;
node3.coordinates = [2, 0.12, -4];

node4.adjacentNodes.topLeft = node1;
node4.adjacentNodes.topRight = node2;
node4.adjacentNodes.left = node3;
node4.adjacentNodes.bottom = node9;
node4.adjacentNodes.bottomLeft = node6;
node4.adjacentNodes.bottomRight = node7;
node4.coordinates = [4, 0.12, -4];

node5.adjacentNodes.top = node0;
node5.adjacentNodes.topRight = node3;
node5.adjacentNodes.right = node6;
node5.adjacentNodes.bottomRight = node8;
node5.adjacentNodes.bottom = node10;
node5.coordinates = [0, 0.12, -3];

node6.adjacentNodes.top = node1;
node6.adjacentNodes.topLeft = node3;
node6.adjacentNodes.topRight = node4;
node6.adjacentNodes.left = node5;
node6.adjacentNodes.right = node7;
node6.adjacentNodes.bottomLeft = node8;
node6.adjacentNodes.bottomRight = node9;
node6.adjacentNodes.bottom = node11;
node6.coordinates = [3, 0.12, -3];

node7.adjacentNodes.top = node2;
node7.adjacentNodes.topLeft = node4;
node7.adjacentNodes.left = node6;
node7.adjacentNodes.bottomLeft = node9;
node7.adjacentNodes.bottom = node12;
node7.coordinates = [6, 0.12, -3];

node8.adjacentNodes.topLeft = node5;
node8.adjacentNodes.topRight = node6;
node8.adjacentNodes.top = node3;
node8.adjacentNodes.right = node9;
node8.adjacentNodes.bottomLeft = node10;
node8.adjacentNodes.bottomRight = node11;
node8.coordinates = [2, 0.12, -2];

node9.adjacentNodes.topLeft = node6;
node9.adjacentNodes.topRight = node7;
node9.adjacentNodes.top = node4;
node9.adjacentNodes.left = node8;
node9.adjacentNodes.bottomLeft = node11;
node9.adjacentNodes.bottomRight = node12;
node9.coordinates = [4, 0.12, -2];

node10.adjacentNodes.top = node5;
node10.adjacentNodes.topRight = node8;
node10.adjacentNodes.right = node11;
node10.coordinates = [1, 0.12, -1];

node11.adjacentNodes.topLeft = node8;
node11.adjacentNodes.topRight = node9;
node11.adjacentNodes.top = node6;
node11.adjacentNodes.left = node10;
node11.adjacentNodes.right = node12;
node11.coordinates = [3, 0.12, -1];

node12.adjacentNodes.top = node7;
node12.adjacentNodes.topLeft = node9;
node12.adjacentNodes.left = node11;
node12.coordinates = [5, 0.12, -1];