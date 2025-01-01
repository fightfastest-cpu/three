import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 150)
camera.position.set(0, 0,50);
scene.add(camera);

const createPoint = ()=>{
    const count = 10000
    const particularGeometry = new THREE.BufferGeometry()

    const points = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
        points[i] = (Math.random() - 0.5) * 100;
        colors[i] = Math.random();
    }
    particularGeometry.setAttribute('position', new THREE.BufferAttribute(points,3));
    particularGeometry.setAttribute('color', new THREE.BufferAttribute(colors,3));

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('../../static/image/snow.png');
    console.log('texture', texture);
    const material = new THREE.PointsMaterial({map: texture});
    material.color = new THREE.Color(0xfff000);
    material.size = 0.5
    material.transparent = true
    material.depthWrite = false;
    material.vertexColors = true;
    const point = new THREE.Points(particularGeometry, material)
    scene.add(point);
    return point;
}

const point1 = createPoint()
const point2 = createPoint()
const point3 = createPoint()

console.log('point1', point1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

const clock = new THREE.Clock()
function renderFun(){
    const time = clock.getElapsedTime()
    point1.rotation.x = time * 0.3;
    point1.rotation.y = time * 0.3;
    point2.rotation.x = time * 0.5;
    point2.rotation.y = time * 0.4;
    point3.rotation.x = time * 0.2;
    point3.rotation.y = time * 0.2;

    controls.update()
    renderer.render(scene,camera)
    requestAnimationFrame(renderFun);
}
renderFun()

window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
})
