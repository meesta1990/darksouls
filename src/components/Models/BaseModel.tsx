import {useFrame, useLoader} from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import React, {useEffect, useMemo, useRef, useState} from "react";
import {Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, Texture, TextureLoader, Vector3} from "three";
import {IPosition, VectorizedPosition} from "../../entities/Node";

export interface IBaseModel {
    model?: string;
    scale?: [number, number, number];
    position?: [number, number, number];
    rotation?: [number, number, number];
    texture?: string;
    metalness?: number;
    format?: 'obj' | 'gltf' | 'fbx';
    onClick?(args: any): void;
    rotateToTarget?: VectorizedPosition;
}
const BaseModel = ({
    model = '',
    scale = [0.3, 0.3, 0.3],
    position = [0, 0.2, 0],
    rotation,
    texture = require("../../assets/models/texture.jpg"),
    metalness = 0,
    format,
    onClick,
    rotateToTarget,
}: IBaseModel) => {
    const [hovered, setHovered] = useState(false)
    let loader: any = OBJLoader;
    const meshRef = useRef<any>()
    const dummyRotateToTargetRef = useRef<any>(null);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    if(format === 'gltf') {
        loader = GLTFLoader;
    }
    if(format === 'fbx') {
        loader = FBXLoader;
    }
    const obj = useLoader(loader, model);
    const copiedScene = useMemo(() => obj.clone(), [obj])
    const t = useLoader(TextureLoader, texture);
    const material = new MeshStandardMaterial({ map: (t as Texture) });
    material.roughness = 0.5;
    material.metalness = metalness;

    copiedScene.traverse((child: any) => {
        if (child instanceof Mesh) {
            child.material = material;
        }
    });

    useFrame((state, delta) => {
        if(rotateToTarget){
            const direction = new Vector3();
            dummyRotateToTargetRef.current.getWorldPosition(direction);
            direction.sub(meshRef.current.position);

            const targetRotationY = Math.atan2(direction.x, direction.z);
            const currentRotationY = meshRef.current.rotation.y;
            const diffRotationY = targetRotationY - currentRotationY;
            meshRef.current.rotation.y += diffRotationY * delta * 5;
        }
    });

    return (
        <>
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={scale}
                ref={meshRef}
                position={position}
                rotation={rotation}
            >
                <meshStandardMaterial roughness={0.1} metalness={0.7} color={'yellow'} />
                <primitive object={copiedScene} onClick={onClick}/>
            </mesh>
            {rotateToTarget &&
                <mesh ref={dummyRotateToTargetRef} position={rotateToTarget}>
                    <meshStandardMaterial color={"blue"} />
                </mesh>
            }
        </>
    );
};

export default BaseModel;