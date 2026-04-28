import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles, useTexture } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import crystalTextureUrl from "/crystal_texture.png";
import * as THREE from "three";


// Crystal Geometry
function createCrystalGeometry() {
    // Texture Scale
    const scale = 0.65;

    const levels = [
        { y: 2.8, r: 0.0 },
        { y: 2.15, r: 0.58 },
        { y: 0.55, r: 0.82 },
        { y: -0.45, r: 0.72 },
        { y: -1.65, r: 0.42 },
        { y: -2.45, r: 0.0 },
    ];

    const sides = 8;

    function makeRing(level) {
        if (level.r === 0) {
            return [[0, level.y, 0]];
        }

        const ring = [];

        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const wobble = i % 2 === 0 ? 1.0 : 0.82;

            ring.push([
                Math.cos(angle) * level.r * wobble,
                      level.y,
                      Math.sin(angle) * level.r * wobble,
            ]);
        }

        return ring;
    }

    const rings = levels.map(makeRing);

    const positions = [];
    const uvs = [];

    function addTriangle(a, b, c) {
        positions.push(...a, ...b, ...c);

        // Each triangle
        uvs.push(
            0.5 * scale, 1.0 * scale,
            0.0 * scale, 0.0 * scale,
            1.0 * scale, 0.0 * scale
        );
    }

    function addQuad(a, b, c, d) {
        positions.push(...a, ...b, ...c);
        uvs.push(
            0.0 * scale, 1.0 * scale,
            0.0 * scale, 0.0 * scale,
            1.0 * scale, 0.0 * scale
        );

        positions.push(...a, ...c, ...d);
        uvs.push(
            0.0 * scale, 1.0 * scale,
            1.0 * scale, 0.0 * scale,
            1.0 * scale, 1.0 * scale
        );
    }

    for (let li = 0; li < rings.length - 1; li++) {
        const a = rings[li];
        const b = rings[li + 1];

        if (a.length === 1) {
            for (let i = 0; i < sides; i++) {
                addTriangle(a[0], b[i], b[(i + 1) % sides]);
            }
        } else if (b.length === 1) {
            for (let i = 0; i < sides; i++) {
                addTriangle(a[i], b[0], a[(i + 1) % sides]);
            }
        } else {
            for (let i = 0; i < sides; i++) {
                addQuad(a[i], b[i], b[(i + 1) % sides], a[(i + 1) % sides]);
            }
        }
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
        "uv",
        new THREE.Float32BufferAttribute(uvs, 2)
    );

    geometry.computeVertexNormals();

    return geometry;
}


// Main Crystal
function CrystalCore() {
    const ref = useRef();
    const materialRef = useRef();
    const geometry = useMemo(() => createCrystalGeometry(), []);

    const texture = useTexture(crystalTextureUrl);

    useMemo(() => {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.generateMipmaps = false;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
    }, [texture]);

    const scrollBoost = useRef(0);
    const lastScrollY = useRef(window.scrollY);

    useEffect(() => {
        function onScroll() {
            const delta = window.scrollY - lastScrollY.current;
            scrollBoost.current += delta * 0.00045;
            lastScrollY.current = window.scrollY;
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useFrame((state) => {
        if (!ref.current) return;

        scrollBoost.current *= 0.92;

        ref.current.rotation.y += 0.0025 + scrollBoost.current;
        ref.current.rotation.x = 0.08;

        ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;

        if (materialRef.current) {
            const t = state.clock.elapsedTime;
            materialRef.current.emissiveIntensity =
            0.75 + Math.sin(t * 2.5) * 0.1;
        }
    });

    return (
        <group ref={ref}>
        {/* inner glow */}
        <mesh scale={[0.42, 0.88, 0.42]} geometry={geometry}>
        <meshBasicMaterial
        color="#dffcff"
        transparent
        opacity={0.58}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        />
        </mesh>

        {/* main crystal */}
        <mesh geometry={geometry}>
        <meshPhysicalMaterial
        ref={materialRef}
        map={texture}
        emissiveMap={texture}
        color="#7beaff"
        emissive="#168cff"
        emissiveIntensity={0.85}
        roughness={0.55}
        metalness={0.05}
        transmission={0.35}
        thickness={1.6}
        transparent
        opacity={0.9}
        clearcoat={0.25}
        clearcoatRoughness={0.6}
        flatShading
        side={THREE.DoubleSide}
        />
        </mesh>
        </group>
    );
}


// Floating Shards
function FloatingShard({ radius, height, angleOffset, scale, speed = 0.12 }) {
    const ref = useRef();
    const geometry = useMemo(() => createCrystalGeometry(), []);
    const texture = useTexture(crystalTextureUrl);

    useMemo(() => {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.generateMipmaps = false;
        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.MirroredRepeatWrapping;
        texture.repeat.set(1, 1);
    }, [texture]);

    useFrame((state) => {
        if (!ref.current) return;

        const t = state.clock.elapsedTime * speed + angleOffset;

        ref.current.position.x = Math.cos(t) * radius;
        ref.current.position.z = Math.sin(t) * radius;
        ref.current.position.y = height + Math.sin(state.clock.elapsedTime * 0.8 + angleOffset) * 0.08;

        ref.current.rotation.y += 0.002;
        ref.current.rotation.x += 0.0008;
    });

    return (
        <mesh ref={ref} scale={scale} geometry={geometry}>
        <meshPhysicalMaterial
        map={texture}
        color="#7beaff"
        emissive="#168cff"
        roughness={0.5}
        metalness={0.02}
        transmission={0.12}
        thickness={0.8}
        transparent
        opacity={0.9}
        clearcoat={0.2}
        clearcoatRoughness={0.55}
        flatShading
        side={THREE.DoubleSide}
        />
        </mesh>
    );
}


// Full Scene
export default function CrystalScene() {
    return (
        <div className="crystal-scene">
        <Canvas
        camera={{ position: [0, 0, 9.5], fov: 42 }}
        gl={{ alpha: true }}
        >

        <ambientLight intensity={0.18} />
        <directionalLight position={[4, 5, 5]} intensity={1.2} />

        <pointLight position={[0, 0, 3]} intensity={5.5} color="#8ff6ff" />
        <pointLight position={[-3.5, 1.5, 3]} intensity={2.4} color="#385dff" />

        <CrystalCore />

        <FloatingShard
        radius={2.0}
        height={0.9}
        angleOffset={0}
        scale={[0.18, 0.14, 0.18]}
        />

        <FloatingShard
        radius={2.3}
        height={0.15}
        angleOffset={Math.PI * 0.75}
        scale={[0.15, 0.12, 0.15]}
        />

        <FloatingShard
        radius={1.8}
        height={-0.8}
        angleOffset={Math.PI * 1.5}
        scale={[0.13, 0.1, 0.13]}
        />

        <GalaxyBackdrop />

        <Environment preset="night" />
        </Canvas>
        </div>
    );
}

function GalaxyBackdrop() {
    return (
        <>
        <Sparkles
        count={700}
        scale={[16, 10, 8]}
        size={1.8}
        speed={0.12}
        opacity={0.65}
        color="#bfefff"
        />

        <Sparkles
        count={180}
        scale={[9, 6, 5]}
        size={3.2}
        speed={0.08}
        opacity={0.45}
        color="#6acfff"
        />
        </>
    );
}
