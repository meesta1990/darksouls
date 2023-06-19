import React, { useRef } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import { Line, LineBasicMaterial, Vector3, Scene } from 'three';

const LineWithGlow = ({ start, end, color, glowColor }: any) => {
    const lineRef = useRef(null);

    useFrame(() => {
        if (lineRef.current) {
            const line: any = lineRef.current;
            line.geometry.setFromPoints([start, end]);
            line.geometry.verticesNeedUpdate = true;
        }
    });

    return (
        <>
            <line ref={lineRef}>
                <lineBasicMaterial attach="material" color={color} linewidth={2} />
                <bufferGeometry attach="geometry" />
            </line>
            <line>
                <lineBasicMaterial attach="material" color={glowColor} linewidth={10} />
                <bufferGeometry attach="geometry" />
            </line>
        </>
    );
};

export default LineWithGlow;