import React, {useEffect, useRef, useState} from 'react';
import ReactDOM, {unmountComponentAtNode} from "react-dom";
import {ITile} from "../../../entities/Tile";
import {Session} from "../../../entities/Session";
import {compareVectorizedPosition, findMeshById, findNearestCoords, getDoorPosition} from "../../../utils/Functions";
import {NodeGraph, VectorizedPosition} from "../../../entities/Node";
import {useFrame, useThree} from "@react-three/fiber";
import {CircleGeometry, MeshBasicMaterial, Color, Vector3} from "three";
import { User } from "../../../entities/User";
import {Mob} from "../../../entities/Monster";
import {updateSession} from "../../../services/Sessions/ServiceSession";
import {setEncountersInTheNode} from "../../../services/Encounters/ServiceEncounter";
import {Class} from "../../../entities/Class";
import './PlayerPosition.css'
import {Button, ThemeProvider} from "@mui/material";
import {theme} from "../../../utils/Constants";

interface IPlayerPosition {
    tile: ITile;
    session: Session;
    user?: User;
    dynamicContainerDivRef: any;
}
const PlayerPosition = ({
    tile,
    session,
    user,
    dynamicContainerDivRef
}: IPlayerPosition) => {
    const [playerPossibleStartPositions, setPlayerPossibleStartPositions] = useState<NodeGraph[]>([]);
    const [hovered, setHovered] = useState(false)
    const meshRefs = useRef<any[]>([]);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    const handleStartFight = () => {
        session.started = true;
        updateSession(session)
    }

    useEffect(()=> {
        const nodeMap = tile.nodes;

        if(tile.lastDoor && nodeMap) {
            const coordsLastDoor = getDoorPosition(tile.lastDoor.position, true);
            const coordsOfAllNodes = nodeMap.map(obj => obj.coordinates);

            if(coordsLastDoor && coordsOfAllNodes){
                //check the most similar cord of the door/nodes
                const nearestNodeCoords = findNearestCoords(coordsLastDoor.position, (coordsOfAllNodes as VectorizedPosition[]));

                if(nearestNodeCoords && nearestNodeCoords[0]){
                    const nearestNode = nodeMap.find((node) => compareVectorizedPosition(node.coordinates, nearestNodeCoords[0]))

                    if (nearestNode) {
                        const adjacentNodesCoords: VectorizedPosition[]  = [];

                        for(let adjacentPosition in nearestNode.adjacentNodes) {
                            const idAdjacentNode = nearestNode.adjacentNodes[adjacentPosition];
                            const adjacentNode = nodeMap.find((node)=> node.id === idAdjacentNode);

                            if (adjacentNode) {
                                // only if it's in the same line:
                                if((adjacentNode.coordinates[0] === nearestNode.coordinates[0])
                                    || (adjacentNode.coordinates[2] === nearestNode.coordinates[2])) {
                                    adjacentNodesCoords.push(adjacentNode.coordinates);
                                }
                            }
                        }
                        //now I check the nearest adjacent node to the door:
                        const nearestNodesCoordsDoTheDoor = findNearestCoords(coordsLastDoor.position, (adjacentNodesCoords as VectorizedPosition[]), 2);
                        const nearestNodesDoTheDoor: NodeGraph[] = [];

                        nearestNodesCoordsDoTheDoor.push(nearestNode.coordinates);
                        nearestNodesCoordsDoTheDoor.map((nearestCoords) => {
                            const temp = nodeMap.find((node) => compareVectorizedPosition(node.coordinates, nearestCoords));

                            // check where the play can be positioned
                            if(temp &&
                                !temp.entitiesInTheNode?.find((mob) => mob.id === -2) &&
                                (!temp.entitiesInTheNode || temp.entitiesInTheNode && temp.entitiesInTheNode.length < 3)) {
                                nearestNodesDoTheDoor.push(temp)
                            }
                        });
                        setPlayerPossibleStartPositions(nearestNodesDoTheDoor);
                    }
                }
            }
        }

        if(tile.nodes) {
            //check if all the players are positioned:
            const chooseClasses = session.players.players.map(a => a.id);;
            let count = 0;
            tile.nodes.map((node) => {
                node.entitiesInTheNode?.find((entity) => {
                    if(chooseClasses.includes(entity.id)){
                        count++;
                    }
                })
            });

            if(count === session.players.max_players && !session.started){
                if (dynamicContainerDivRef.current) {
                    ReactDOM.render(
                        <div className="button-start-container">
                            <ThemeProvider theme={theme}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    onClick={handleStartFight}
                                >
                                    Fight
                                </Button>
                            </ThemeProvider>
                        </div>,
                        dynamicContainerDivRef.current
                    )
                }
            } else {
                unmountComponentAtNode(dynamicContainerDivRef.current)
            }
        }
    }, [tile.nodes]);

    useFrame(() => {
        meshRefs.current.forEach((meshRef, index) => {
            if(meshRef && meshRef.material) {
                meshRef.material.emissiveIntensity = Math.sin(Date.now() * 0.003) * 0.9 + 0.5;
            }
        });
    });

    const handlePlayerPositioning = (node: NodeGraph) => {
        const myPlayer = session.players.players.find((player) => player.owner.uid === user?.uid);

        if (myPlayer) {
            const nodeMap = tile.nodes.map((node) => {
                if (node.entitiesInTheNode && myPlayer) {
                    node.entitiesInTheNode = node.entitiesInTheNode.filter((entity) => {
                        if (entity.id === myPlayer.id) {
                            return false;
                        }
                        return true;
                    });
                }
                return node;
            });
            const nodeToUpdate = nodeMap.find((_n) => _n.id === node.id);

            if(nodeToUpdate){
                if(!nodeToUpdate.entitiesInTheNode) nodeToUpdate.entitiesInTheNode = [];
                nodeToUpdate.entitiesInTheNode.push(new Class({ id: myPlayer.id }));
            }
            setEncountersInTheNode(session, tile, nodeMap);
        }
    }

    return (
        <>
            {!session.started && playerPossibleStartPositions.map((playerPossibleStartPosition, index)=>
                <mesh
                    key={index}
                    ref={el => meshRefs.current[index] = el}
                    scale={[0.3, 0.3, 0.3]}
                    position={[playerPossibleStartPosition.coordinates[0], 0.16, playerPossibleStartPosition.coordinates[2]]}
                    geometry={ new CircleGeometry(1, 32)}
                    rotation={[-Math.PI / 2, 0, 0]}
                    onClick={() => handlePlayerPositioning(playerPossibleStartPosition)}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <meshStandardMaterial transparent opacity={0.5} color={'#31b100'} emissive={'#31b100'} emissiveIntensity={0} />
                </mesh>
            )}
        </>
    );
}

export default PlayerPosition;