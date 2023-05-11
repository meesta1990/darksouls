import React, {Suspense, useEffect, useRef, useState} from 'react'
import Cell from './Cell'
import { Environment, OrbitControls } from '@react-three/drei';
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {IDoor, ITile} from "../../../entities/Tile";
import {DirectionalLight, Mesh, Scene, Texture, TextureLoader} from "three";
import HollowMelee from "../../Models/HollowMelee";
import {User} from "../../../entities/User";
import {Mob} from "../../../entities/Monster";
import {Session} from "../../../entities/Session";
import './Board.css'
import {updateSession} from "../../../services/Sessions/ServiceSession";
import { SOUND_NEW_AREA } from "../../../utils/Constants";
import BoardBonefire from "./BoardBonefire";
import NormalEnemiesBoard from "./NormalEnemiesBoard";
import ReactAudioPlayer from "react-audio-player";
import FireParticles from "../../Models/FireParticles";
import {nodeMap} from "./MapNodeGraph";

interface IBoard {
    tile: ITile;
    user?: User;
    mobs?: Mob[];
    session: Session;
    onTileClick?: () => void;
    focussed: boolean;
}

interface IBoardInternal {
    tile: ITile;
    session: Session;
    mobs?: Mob[];
    sceneRef: any;
}
const BoardInternal = ({
    tile,
    session,
    mobs,
    sceneRef
}: IBoardInternal) => {
    const offset = 2; //margins
    const gridSize = 5 + offset;
    const rows = Array(gridSize).fill(null).map((_, i) => i);
    const cols = Array(gridSize).fill(null).map((_, i) => i);
    const texture = useLoader(TextureLoader, require("../../../assets/images/tiles/" + tile.id + ".jpg"));
    const { gl } = useThree();

    const handleDoorClick = (doorClicked: IDoor, nextTile?: ITile) => {
        const test = nextTile?.id !== 1 && nextTile?.id !== 2; // remove!

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
            return <BoardBonefire session={session} tile={tile} onDoorClicked={handleDoorClick} />
        }
        if(tile.id > 2) {
            return <NormalEnemiesBoard mobs={mobs} session={session} tile={tile} onDoorClicked={handleDoorClick} />
        }
    };

    return (
        <group position={[-3.5, 0, 3.5]}>
          {rows.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {cols.map((cell, cellIndex) => (
                <Cell
                    key={rowIndex.toString() + cellIndex.toString()}
                    position={{ x: rowIndex, y: -cellIndex }}
                />
              ))}
            </React.Fragment>
          ))}
          <mesh
            scale={[7, 7, 0.1]}
            position={[3, 0.1, -3]}
            rotation={[Math.PI / -2, 0, 0]}>
              <boxGeometry />
              <meshBasicMaterial attach="material" map={(texture as Texture)} />
          </mesh>
            { getRightBoard() }
        </group>
    )
};

const Board = (props: IBoard) => {
    const sceneRef = useRef<any>();
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

            <Suspense fallback={<h1></h1>}>
                <Canvas camera={{ fov: 90, position: [4, 4, -0.5] }} ref={sceneRef}>
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enablePan={false} minDistance={4} maxDistance={10}/>
                    <Environment files={require("../../../assets/images/wallpaper_50.hdr")} background />
                    <BoardInternal {...props} sceneRef={sceneRef} />
                </Canvas>
            </Suspense>
        </div>
    )
};

export default Board
