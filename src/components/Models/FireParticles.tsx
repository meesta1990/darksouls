import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {PointsMaterial} from "three";

const FireParticles = () => {
    const pointsRef = useRef<any>();
    const particles: any[] = [];

    for (let i = 0; i < 500; i++) {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const z = Math.random() * 2 - 1;
        const size = Math.random() * 0.2 + 0.1;
        particles.push(x, y, z, size);
    }

    useFrame(() => {
        // Animazione dei punti
        const positions = pointsRef.current.geometry.attributes.position.array;
        for (let i = 0; i < particles.length; i += 4) {
            const x = particles[i];
            const y = particles[i + 1];
            const z = particles[i + 2];

            // Simulazione della fiamma
            particles[i + 1] += Math.random() * 0.02;
            particles[i + 2] += Math.random() * 0.02;
            particles[i + 3] -= 0.002;

            // Reset delle particelle che raggiungono il fondo
            if (particles[i + 3] < 0) {
                particles[i + 1] = Math.random() * 2 - 1;
                particles[i + 2] = Math.random() * 2 - 1;
                particles[i + 3] = Math.random() * 0.2 + 0.1;
            }

            positions[i] = x;
            positions[i + 1] = y;
            positions[i + 2] = z;
        }

        // Aggiornamento dei punti
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    const material = new PointsMaterial({
        size: 0.1,
        color: '#ff6600',
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    // @ts-ignore
                    attachObject={['attributes', 'position']}
                    array={new Float32Array(particles)}
                    itemSize={4}
                />
            </bufferGeometry>
            <pointsMaterial attach="material" {...material} />
        </points>
    );
}

export default FireParticles;