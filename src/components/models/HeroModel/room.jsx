// Room.jsx
import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// ✅ Preload new model for smoother load
useGLTF.preload("/models/gaming_desktop_pc.glb");

export function Room(props) {
  const [ready, setReady] = useState(false);

  // Load the entire model
  const { scene } = useGLTF("/models/gaming_desktop_pc.glb", true, (loader) => {
    loader.manager.onLoad = () => setReady(true);
  });

  return (
    <group {...props} dispose={null}>
      {/* Postprocessing only after load */}
      {ready && (
        <EffectComposer>
          <SelectiveBloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
        </EffectComposer>
      )}

      {/* ✅ Render the whole model */}
      <primitive object={scene} />
    </group>
  );
}
