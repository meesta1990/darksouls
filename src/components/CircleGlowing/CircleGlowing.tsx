import React, {useEffect, useRef, useState} from "react";
import { CircleGeometry } from "three";
import { VectorizedPosition } from "../../entities/Node";
import {useFrame} from "@react-three/fiber";

interface ICircleGlowing {
    position: VectorizedPosition;
    onClick?(): void;
}

const CircleGlowing = ({
    position,
    onClick
}: ICircleGlowing) => {
    const [hovered, setHovered] = useState(false)
    const meshRef = useRef<any>(null);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered]);

    useFrame(() => {
        if(meshRef && meshRef.current && meshRef.current.material) {
            meshRef.current.material.emissiveIntensity = Math.sin(Date.now() * 0.003) * 0.9 + 0.5;
        }
    });

    return (
        <mesh
            ref={meshRef}
            scale={[0.3, 0.3, 0.3]}
            position={position}
            geometry={ new CircleGeometry(1, 32)}
            rotation={[-Math.PI / 2, 0, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={onClick}
        >
            <meshStandardMaterial transparent opacity={0.5} color={'#31b100'} emissive={'#31b100'} emissiveIntensity={0} />
        </mesh>
    )
}

export default CircleGlowing;