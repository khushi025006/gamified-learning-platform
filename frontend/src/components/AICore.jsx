import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Float } from "@react-three/drei";

function CoreSphere() {
  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />

        <meshStandardMaterial
          color="#3b82f6"
          emissive="#60a5fa"
          emissiveIntensity={3}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function AICore() {
  return (
    <div className="ai-core-container">
      <Canvas camera={{ position: [0, 0, 4] }}>

        <ambientLight intensity={2} />

        <pointLight
          position={[5, 5, 5]}
          intensity={40}
          color="#60a5fa"
        />

        <pointLight
          position={[-5, -5, -5]}
          intensity={20}
          color="#7c3aed"
        />

        <CoreSphere />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
        />

      </Canvas>
    </div>
  );
}