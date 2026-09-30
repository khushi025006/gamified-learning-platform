import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

function Portal() {

  const portal = useRef();

  useFrame(({ clock }) => {

    const t = clock.getElapsedTime();

    portal.current.rotation.z += 0.004;

    portal.current.scale.x =
      1 + Math.sin(t * 2) * 0.04;

    portal.current.scale.y =
      1 + Math.sin(t * 2) * 0.04;

  });

  return (

    <group>

      {/* Outer Ring */}

      <mesh
        ref={portal}
        rotation={[Math.PI / 2, 0, 0]}
      >

        <torusGeometry
          args={[2,0.18,32,250]}
        />

        <meshStandardMaterial
          color="#4da6ff"
          emissive="#6d28d9"
          emissiveIntensity={4}
        />

      </mesh>

      {/* Inner Ring */}

      <mesh rotation={[Math.PI/2,0,0]}>

        <torusGeometry
          args={[1.6,0.08,24,180]}
        />

        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={6}
        />

      </mesh>

      {/* Portal Core */}

      <mesh>

        <circleGeometry
          args={[1.5,100]}
        />

        <meshStandardMaterial
          color="#111827"
          emissive="#2563eb"
          emissiveIntensity={2}
        />

      </mesh>

    </group>

  );

}

export default function ThreeScene() {

  return (

    <Canvas

      camera={{

        position:[0,0,6],

        fov:55

      }}

    >

      <color
        attach="background"
        args={["#020617"]}
      />

      <ambientLight intensity={1.8}/>

      <pointLight

        position={[4,4,4]}
        intensity={120}
        color="#60a5fa"

      />

      <pointLight

        position={[-4,-2,3]}
        intensity={80}
        color="#7c3aed"

      />

      <Stars

        radius={120}
        depth={80}
        count={4000}
        factor={3}
        saturation={0}
        fade

      />

      <Portal/>

      <OrbitControls

        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.25}

      />

    </Canvas>

  );

}