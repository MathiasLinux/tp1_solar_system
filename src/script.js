import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/**
 * Base
 */

// Debug Importer lil gui et l'instancier ici si besoin


// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene Créer la scene ici

const scene = new THREE.Scene();
/**
 * Textures Instancier le textureLoader ici pour ajouter les textures
 */

const textureLoader = new THREE.TextureLoader()

/**
 * Objects 
 */

// Scale divid by 50000

// Sun
const sunGeometry = new THREE.SphereGeometry(280, 32, 16)
const sunMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/sunmap.png')
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)

// Mercury
const mercuryGeometry = new THREE.SphereGeometry(0.9, 32, 16)
const mercuryMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/mercurymap.png')
})
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial)

mercury.position.x = 325

//Venus
const venusGeometry = new THREE.SphereGeometry(2.4, 32, 16)
const venusMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/venusmap.png')
})
const venus = new THREE.Mesh(venusGeometry, venusMaterial)

venus.position.x = 375

// Earth
const earthGeometry = new THREE.SphereGeometry(5, 32, 16)
const earthMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/earthmap.png')
})
const earth = new THREE.Mesh(earthGeometry, earthMaterial)

earth.position.x = 425

// Mars
const marsGeometry = new THREE.SphereGeometry(1.3, 32, 16)
const marsMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/marsmap.png')
})
const mars = new THREE.Mesh(marsGeometry, marsMaterial)

mars.position.x = 475

// Jupiter
const jupiterGeometry = new THREE.SphereGeometry(28, 32, 16)
const jupiterMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/jupitermap.png')
})
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial)

jupiter.position.x = 550

// Saturn
const saturnGeometry = new THREE.SphereGeometry(24, 32, 16)
const saturnMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/saturnmap.png')
})
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial)

saturn.position.x = 650

// Saturn Ring
const saturnRingGeometry = new THREE.RingGeometry(30, 40, 32)
const saturnRingMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/saturnringmap.png'),
    side: THREE.DoubleSide
})
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial)

saturnRing.position.x = 650
saturnRing.rotation.x = 1.5

// Uranus
const uranusGeometry = new THREE.SphereGeometry(10, 32, 16)
const uranusMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/uranusmap.png')
})
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial)

uranus.position.x = 750

// Neptune
const neptuneGeometry = new THREE.SphereGeometry(9, 32, 16)
const neptuneMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/textures/neptunemap.png')
})
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial)

neptune.position.x = 850

scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, saturnRing, uranus, neptune);

// Array to hold asteroids
let asteroids = [];

// Function to create an asteroid
function createAsteroid() {
    const geometry = new THREE.SphereGeometry(Math.random() * 3, 32, 16);
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load('/textures/asteroidmap.jpg')
    });
    const asteroid = new THREE.Mesh(geometry, material);

    asteroid.position.x = Math.random() * 1000 - 500;
    asteroid.position.y = Math.random() * 1000 - 500;
    asteroid.position.z = Math.random() * 1000 - 500;

    asteroid.velocity = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
    );

    asteroid.creationTime = Date.now();

    asteroids.push(asteroid);
    scene.add(asteroid);
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera  Ajouter une camera ici
 */
// Base camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
scene.add(camera)
camera.position.z = 800
camera.position.x = 500


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Function to rotate a planet
function selfRotation(planet, speed, elapsedTime){
    planet.rotation.y = elapsedTime / speed
}

// Function to rotate a planet around another
function rotationAroundSun(planet, speed, elapsedTime) {
    const distance = planet.position.distanceTo(sun.position);
    const angle = elapsedTime / speed;
    planet.position.x = sun.position.x + distance * Math.cos(angle);
    planet.position.z = sun.position.z + distance * Math.sin(angle);
}

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune

    selfRotation(sun, 25, elapsedTime)
    selfRotation(mercury, 59, elapsedTime)
    selfRotation(venus, 243, elapsedTime)
    selfRotation(earth, 1, elapsedTime)
    selfRotation(mars, 1.5, elapsedTime)
    selfRotation(jupiter, 0.4, elapsedTime)
    selfRotation(saturn, 0.5, elapsedTime)
    //selfRotation(saturnRing, 0.5, elapsedTime)
    selfRotation(uranus, 0.75, elapsedTime)
    selfRotation(neptune, 0.7, elapsedTime)
    
    rotationAroundSun(mercury, 0.8, elapsedTime)
    rotationAroundSun(venus, 2.25, elapsedTime)
    rotationAroundSun(earth, 3.65, elapsedTime)
    rotationAroundSun(mars, 6.87, elapsedTime)
    rotationAroundSun(jupiter, 43.33, elapsedTime)
    rotationAroundSun(saturn, 107.59, elapsedTime)
    rotationAroundSun(saturnRing, 107.59, elapsedTime)
    rotationAroundSun(uranus, 306.85, elapsedTime)
    rotationAroundSun(neptune, 601.90, elapsedTime)

    // Update asteroids
    asteroids.forEach(asteroid => {
        asteroid.position.add(asteroid.velocity);

        // Remove asteroid if it has existed for more than 10 seconds
        if (Date.now() - asteroid.creationTime > 10000) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
    });

    // Create new asteroid every second
    if (elapsedTime % 1 < 0.01) {
        createAsteroid();
    }

    // If an asteroid touch a planet, remove it
    asteroids.forEach(asteroid => {
        if (asteroid.position.distanceTo(sun.position) < 280) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
        if (asteroid.position.distanceTo(mercury.position) < 1.8) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
        if (asteroid.position.distanceTo(venus.position) < 3.9) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
        if (asteroid.position.distanceTo(earth.position) < 6.5) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
        if (asteroid.position.distanceTo(mars.position) < 2.8) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
        if (asteroid.position.distanceTo(jupiter.position) < 30) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
        if (asteroid.position.distanceTo(saturn.position) < 26) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
        if (asteroid.position.distanceTo(uranus.position) < 12) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
        if (asteroid.position.distanceTo(neptune.position) < 11) {
            scene.remove(asteroid);
            asteroids = asteroids.filter(a => a !== asteroid);
        }
    });

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()