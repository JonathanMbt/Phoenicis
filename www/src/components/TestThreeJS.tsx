import { FC, useEffect } from 'react';
import * as Three from 'three';

const TestThreeJS: FC = () => {
  function main()
  {
    const canvas = document.querySelector('#c');
    const renderer = new Three.WebGLRenderer({canvas});

    const fov = 90;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new Three.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    const scene = new Three.Scene();

    const boxWidth = .7;
    const boxHeight = .7;
    const boxDepth = .7;
    const geometry = new Three.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const cube0 = makeInstance(scene, geometry, 0x44aa88, -2)
    const cube1 = makeInstance(scene, geometry, 0x44aa88, 0)
    const cube2 = makeInstance(scene, geometry, 0x44aa88, 2)

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new Three.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    renderer.render(scene, camera);

    function render(time)
    {
      time *= 0.005;
      const posDelta0 = Math.cos(time);
      const posDelta1 = Math.cos(time+1);
      const posDelta2 = Math.cos(time+2);

      cube0.rotation.x = time;
      cube0.rotation.y = time;
      cube0.position.y = posDelta0;

      cube1.rotation.x = time;
      cube1.rotation.y = time;
      cube1.position.y = posDelta1;

      cube2.rotation.x = time;
      cube2.rotation.y = time;
      cube2.position.y = posDelta2;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }
  function makeInstance(scene, geometry, color, x)
  {
    const material = new Three.MeshPhongMaterial({color});
    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube
  }
  
  

  useEffect(() => {
    main()
  }, [main])

  return (
    <canvas id="c"></canvas>
  );
};

export default TestThreeJS;
