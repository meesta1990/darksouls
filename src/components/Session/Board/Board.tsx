import React, {Suspense, useEffect, useRef, useState} from 'react'
import { Environment, OrbitControls } from '@react-three/drei';
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {IDoor, ITile} from "../../../entities/Tile";
import { Texture, TextureLoader} from "three";
import {User} from "../../../entities/User";
import {Mob} from "../../../entities/Monster";
import {Session} from "../../../entities/Session";
import './Board.css'
import {updateSession} from "../../../services/Sessions/ServiceSession";
import { SOUND_NEW_AREA } from "../../../utils/Constants";
import BoardBonefire from "./BoardBonefire";
import NormalEnemiesBoard from "./NormalEnemiesBoard";
import ReactAudioPlayer from "react-audio-player";
import MapNode from "./Node";
import {NodeMap} from "./MapNodeGraph";
import {Class} from "../../../entities/Class";

interface IBoard {
    tile: ITile;
    user?: User;
    mobs?: Mob[];
    classes?: Class[];
    session: Session;
    onTileClick?: () => void;
    focussed: boolean;
}

interface IBoardInternal extends IBoard{
    sceneRef: any;
    dynamicContainerDivRef: any;
}
const BoardInternal = ({
    tile,
    session,
    mobs,
    sceneRef,
    user,
    classes,
    dynamicContainerDivRef
}: IBoardInternal) => {
    const offset = 2; //margins
    const texture = useLoader(TextureLoader, require("../../../assets/images/tiles/" + tile.id + ".jpg"));
    const { gl } = useThree();
    const nodeMap = tile.nodes ? tile.nodes : new NodeMap().getNodeMap();
    const handleDoorClick = (doorClicked: IDoor, nextTile?: ITile) => {
        const test = nextTile?.id !== 1 && nextTile?.id !== 2; // todo: remove!

        if(nextTile && session && test) {
            gl.domElement.style.transition = "opacity 1s";
            gl.domElement.style.opacity = "0";
            gl.domElement.style.cursor = "default";
            gl.domElement.style.pointerEvents = "default";

            setTimeout(() => {
                gl.domElement.style.opacity = "1";
                gl.domElement.style.cursor = "";
                gl.domElement.style.pointerEvents = "";

                nextTile.lastDoor = doorClicked;
                session.currentTile = nextTile;
                updateSession(session);
                const audio = new Audio(SOUND_NEW_AREA);
                audio.play();
            }, 1000);
        }
    }
    const getRightBoard = () => {
        if(tile.id === 0) {
            return <BoardBonefire
                classes={classes}
                session={session}
                tile={tile}
                onDoorClicked={handleDoorClick}
                sceneRef={sceneRef}
                dynamicContainerDivRef={dynamicContainerDivRef}
            />
        }
        if(tile.id > 2) {
            return <NormalEnemiesBoard
                classes={classes}
                mobs={mobs}
                session={session}
                tile={tile}
                dynamicContainerDivRef={dynamicContainerDivRef}
                onDoorClicked={handleDoorClick}
                sceneRef={sceneRef}
                user={user}
            />
        }
    };

    return (
        <group position={[-3.5, 0, 3.5]}>
            {nodeMap.map((node) => <MapNode key={node.id} node={node} />)}

            <mesh
                scale={[7, 7, 0.1]}
                position={[3, 0.1, -3]}
                rotation={[Math.PI / -2, 0, 0]}
            >
                <boxGeometry />
                <meshBasicMaterial attach="material" map={(texture as Texture)} />
            </mesh>
            { getRightBoard() }
        </group>
    )
};

const Board = (props: IBoard) => {
    const sceneRef = useRef<any>();
    const dynamicContainerDivRef = useRef<any>();
    const testing = false; //todo:test

    return (
        <div className="board-container">
            <ReactAudioPlayer
                src={props.session.currentTile.soundtrack}
                autoPlay={testing}
                volume={0.2}
                controls
                loop
            />
            <div id="dynamicContainer" ref={dynamicContainerDivRef} />

            <Suspense fallback={<h1></h1>}>
                <Canvas camera={{ fov: 90, position: [4, 4, -0.5] }} ref={sceneRef}>
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enablePan={false} minDistance={4} maxDistance={10}/>
                    <Environment files={require("../../../assets/images/wallpaper_50.hdr")} background />
                    <BoardInternal dynamicContainerDivRef={dynamicContainerDivRef} {...props} sceneRef={sceneRef} />
                </Canvas>
            </Suspense>
        </div>
    )
};

export default Board
