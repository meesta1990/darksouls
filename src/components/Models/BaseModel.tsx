import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import React, {forwardRef, useEffect, useMemo, useRef, useState, useImperativeHandle} from "react";
import { Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, Texture, TextureLoader, Vector3 } from "three";
import { IPosition, NodeGraph, VectorizedPosition } from "../../entities/Node";

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
    focused?: boolean;
}

const BaseModel = forwardRef(({
    model = '',
    scale = [0.3, 0.3, 0.3],
    position = [0, 0.2, 0],
    rotation,
    texture = require("../../assets/models/texture.jpg"),
    metalness = 0,
    format,
    onClick,
    rotateToTarget,
    focused = false,
}: IBaseModel, ref: any) => {
    const [hovered, setHovered] = useState(false)
    let loader: any = OBJLoader;
    const dummyRotateToTargetRef = useRef<any>(null);
    const [destination, setDestination] = useState<VectorizedPosition | null>(null);
    const meshRef: any = useRef();

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
    if(focused){
        material.color.set('#e16410')
    }

    copiedScene.traverse((child: any) => {
        if (child instanceof Mesh) {
            child.material = material;
        }
    });

    useFrame((state, delta) => {
        if(rotateToTarget && ref && meshRef.current && meshRef.current.position){
            const faceDirection = new Vector3();
            dummyRotateToTargetRef.current.getWorldPosition(faceDirection);
            faceDirection.sub(meshRef.current.position);
            const targetRotationY = Math.atan2(faceDirection.x, faceDirection.z);
            const currentRotationY = meshRef.current.rotation.y;
            const diffRotationY = targetRotationY - currentRotationY;
            meshRef.current.rotation.y += diffRotationY * delta * 5;
        }

        if (destination ) {
            const speed = 0.02;

            const direction = [
                destination[0] - meshRef.current.position.x,
                destination[1] - meshRef.current.position.y,
                destination[2] - meshRef.current.position.z,
            ];

            const distance = Math.sqrt(
                direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2
            );

            if(distance >= 0.01) {
                const normalizedDirection = [
                    direction[0] / distance,
                    direction[1] / distance,
                    direction[2] / distance,
                ];

                const movement = [
                    normalizedDirection[0] * speed,
                    normalizedDirection[1] * speed,
                    normalizedDirection[2] * speed,
                ];

                meshRef.current.position.x += movement[0];
                meshRef.current.position.y += movement[1];
                meshRef.current.position.z += movement[2];
            }
        }
    });

    const moveToDestination = (newPosition: VectorizedPosition) => {
        setDestination(newPosition);
    };

    useImperativeHandle(ref, () => ({
        ...ref.current,
        moveToDestination,
    }));

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
                <primitive object={copiedScene} onClick={onClick} />
            </mesh>
            {rotateToTarget &&
                <mesh ref={dummyRotateToTargetRef} position={rotateToTarget}>
                    <meshStandardMaterial color={"blue"} />
                </mesh>
            }
        </>
    );
});

export default BaseModel;