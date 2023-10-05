import { PerspectiveCamera, RenderTexture, Text } from "@react-three/drei/core";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

const Cube = () => {
  const textRef = useRef<Group>(null!);
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.x = (Math.sin(state.clock.elapsedTime) * 2);
    }
  });
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial>
        <RenderTexture attach="map">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <color attach="background" args={["#dc9dcd"]} />
          <Text ref={textRef} fontSize={3} color="#555">
            hello
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
};

export default Cube;