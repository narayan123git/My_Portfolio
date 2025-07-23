import * as THREE from 'three';
import React from 'react'

const HeroLights = () => {
    return (
        <>
            <spotLight
                position={[6, 5, 5]}
                intensity={50}
                angle={0.6}
                penumbra={0.5}
                color="4cc9f0"
            />
             <spotLight
                position={[-3, 5, 5]}
                intensity={60}
                angle={0.4}
                penumbra={1}
                color="9d4edd"
            />
            <primitive object={new THREE.RectAreaLight("#A259FF",8,15,4)}
                position={[6, 1, 0]}
                rotation={[-Math.PI / 4, Math.PI/4, 0]}
                intensity={2}
            />
            <pointLight
                position={[0, 1, 0]}
                intensity={15}
                color="#7209b7"
            />
            <pointLight
                position={[1, 2, -2]}
                intensity={10}
                color="#0d00a4"
            />
            </>
            )
}

            export default HeroLights