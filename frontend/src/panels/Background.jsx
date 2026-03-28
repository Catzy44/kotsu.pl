import s from "../Root.module.scss";
import {useEffect, useRef} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/addons";

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function makeTextSprite(message, font = "24px Arial", fillStyle = "white") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    context.font = font;
    const metrics = context.measureText(message);
    const fontSize = parseInt(font, 10) || 24;

    canvas.width = metrics.width * 2;
    canvas.height = fontSize * 2;

    context.font = font;
    context.fillStyle = fillStyle;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(message, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;

    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);

    // dopasuj proporcje
    const aspect = canvas.width / canvas.height;
    sprite.scale.set(aspect, 1, 1);

    return sprite;
}

export default function NFSMenuScene() {
    const wrapRef = useRef(null)

    useEffect(() => {
        // 1. Scena
        const scene = new THREE.Scene()

        // 2. Kamera (perspektywiczna)
        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.1, 1000
        )
        camera.position.z = 5;

        // 3. Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor(0x0a0a0a, 1);
        renderer.setSize(window.innerWidth, window.innerHeight)
        wrapRef.current.innerHTML = ""
        wrapRef.current.append(renderer.domElement)

        let isRotating = false
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;      // płynne ruchy
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.8;         // czułość obrotu
        controls.enableZoom = false;
        controls.zoomSpeed = 0;           // czułość zooma
        controls.enablePan = false;         // blokada przesuwania (opcjonalnie)
        controls.minDistance = 50;          // minimalny zoom
        controls.maxDistance = 300;         // maksymalny zoom

        controls.autoRotate = true;
        controls.autoRotateSpeed = -0.4;

        controls.addEventListener("start", () => {
            isRotating = true
        })

        controls.addEventListener("end", () => {
            isRotating = false
        })

        {
            // ======= GWIAZDY =======
            const starCount = 2000       // ile gwiazd
            const radius = 400           // promień kuli

            const positions = []
            for (let i = 0; i < starCount; i++) {
                // losowe współrzędne na sferze
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos(2 * Math.random() - 1);

                const x = radius * Math.sin(phi) * Math.cos(theta)
                const y = radius * Math.sin(phi) * Math.sin(theta)
                const z = radius * Math.cos(phi)

                positions.push(x, y, z)
            }

            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))

            const material = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 0.8,        // wielkość punkcików
                sizeAttenuation: true
            })

            const stars = new THREE.Points(geometry, material)
            scene.add(stars)
        }
        {
            // ======= EMOTKI =======
            const emoticons = [
                "✨", "🌟", "⭐", "💫", "☄️", "🌌",
                "🌙", "🌠", "🪐", "🌞", "🌛", "🌜",
                "🔥", "❄️", "⚡", "💎", "🔮",
                "🧿", "👾", "🎇", "🎆", "🌺", "🌻"
            ];
            const starCount = 60       // ile gwiazd
            const radiusMin = 50           // promień kuli
            const radiusMax = 120
            const scale = 4

            for (let i = 0; i < starCount; i++) {
                const radius = randomBetween(radiusMin, radiusMax)

                // losowe współrzędne na sferze
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos(2 * Math.random() - 1);

                const x = radius * Math.sin(phi) * Math.cos(theta)
                const y = radius * Math.sin(phi) * Math.sin(theta)
                const z = radius * Math.cos(phi)

                const emo = emoticons[Math.floor(Math.random() * emoticons.length)];
                const sprite = makeTextSprite(emo, "64px Arial", "white");
                sprite.position.set(x, y, z);
                sprite.scale.set(scale, scale, 1); // wielkość emotki
                scene.add(sprite);
            }
        }


        const radius = 80
        const angle = Math.PI
        camera.position.x = radius * Math.cos(angle);
        camera.position.z = radius * Math.sin(angle);
        camera.position.y = 10 * Math.sin(angle * 0.5);

        let running = true
        let clock = new THREE.Clock();
        function animate() {
            if(!running) return
            requestAnimationFrame(animate)



            camera.lookAt(0, 0, 0); // kamera zawsze w stronę centrum

            const delta = clock.getDelta()
            controls.update(delta)

            renderer.render(scene, camera)
        }
        animate()

        return () => {
            running = false
            renderer.dispose()
        }
    }, [import.meta.hot])

    return (
        <div
            ref={wrapRef}
            className={s.rain_wrapper}
            style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 0 }}
        />
    );
}