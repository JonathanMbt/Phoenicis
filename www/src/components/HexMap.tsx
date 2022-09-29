import React, {Suspense, useRef, FC, useEffect } from 'react';
import {Canvas, useThree} from 'react-three-fiber';
import * as Three from 'three';
import {PMREMGenerator} from "three/src/extras/PMREMGenerator";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";

const HexMap: FC = () => {

    const canvas = document.querySelector('#c');
    const scene = new Three.Scene();
    scene.background = new Three.Color("#FFEECC");

    const camera = new Three.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(0,0,50);

    const renderer = new Three.WebGLRenderer({canvas});
    renderer.setSize(innerWidth, innerHeight);
    renderer.toneMapping = Three.ACESFilmicToneMapping;
    renderer.outputEncoding = Three.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    document.body.appendChild(renderer.domElement);

    function main()
    {
        let sphereMesh = new Three.Mesh(
            new Three.SphereGeometry(5, 10, 10),
            new Three.MeshBasicMaterial({ color: 0xFF0000})
        );

        scene.add(sphereMesh);
        

        function render()
        {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    let envmap;
    (async function(){
        const pmrem = new PMREMGenerator(renderer);
        const envmapTexture = await new RGBELoader().loadAsync("../assets/hdr/environment.hdr");
        envmap = pmrem.fromEquirectangular(envmapTexture).texture;

        renderer.setAnimationLoop(()=>
        {
            renderer.render(scene, camera);
        })
    });


    useEffect(() => 
    {
        main()
    }, 
    [main]);
    
    return (
        <canvas id="c"></canvas>
    );
};

export default HexMap;