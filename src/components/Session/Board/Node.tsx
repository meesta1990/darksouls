import React from "react";
import {NodeGraph} from "../../../entities/Node";
import {CircleGeometry, MeshBasicMaterial} from "three";

interface IMapNode {
    node: NodeGraph,
    nodeMaterial?: MeshBasicMaterial
}

const MapNode = ({
    node,
    nodeMaterial = new MeshBasicMaterial({ color: '#31b100', opacity: 0, transparent: true })
}: IMapNode) => {
    const circleGeometry = new CircleGeometry(1, 32);
    if (!node.coordinates) return <></>;

    return (
        <mesh
            userData={{ id: node.id }}
            scale={[0.25, 0.25, 0.25]}
            onClick={()=>console.log('clicked node',node)}
            position={[node.coordinates[0], 0.155, node.coordinates[2]]}
            geometry={circleGeometry}
            rotation={[-Math.PI / 2, 0, 0]}
            material={nodeMaterial}
        />
    )
};
export default MapNode;