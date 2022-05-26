import * as THREE from 'https://unpkg.com/three@0.108.0/build/three.module.js';
import {GLTFLoader} from 'https://unpkg.com/three@0.108.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js';

function main() {
    // Setup
    const canvas = document.getElementById('c');
    const renderer = new THREE.WebGLRenderer({canvas});
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x1d1b1c );

    // Camera
    const fov= 75;
    const aspect= 2;
    const near= .1;
    const far= 5;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z=.425;

 

    // Orbit Controls
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();

    let watch;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('model/watch01.gltf', gltf => {
        const root = gltf.scene;
        scene.add(root);
        watch=root.getObjectByName('extracted_09001');
    });
    

    {
        let color = 0xFFFFFF;
        let intensity = 1;
        const keyLight = new THREE.DirectionalLight(color, intensity);
        keyLight.position.set(-1, 2, 3);
        scene.add(keyLight);

        intensity = .6;
        const fillLight01 = new THREE.DirectionalLight(color, intensity);
        fillLight01.position.set(2,1.5,1)
        scene.add(fillLight01);

        intensity = .4;
        const fillLight02 = new THREE.DirectionalLight(color, intensity);
        fillLight02.position.set(-1, -1, -2);
        scene.add(fillLight02);
    }



    // Rendering Functions
    const fitRenderToDisplay = (renderer) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;

        needResize && renderer.setSize(width, height, false);

        return needResize;
    }

    const render = time => {
        time *= 0.0001;  // convert time to seconds
            
        if (watch) {
            watch.rotation.y = time;
        } 

        controls.update();

        if (fitRenderToDisplay(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();