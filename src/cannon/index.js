import * as THREE from "three"
import * as CANNON from 'cannon-es'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 20)
scene.add(camera);

// 设置光源
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.castShadow = true;//添加阴影
scene.add(directionalLight);


// 球体
const sphereGeometry = new THREE.SphereGeometry(1,20,20)
const sphereMaterial = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true //设置阴影
scene.add(sphere)

// 平面
const floorPlane = new THREE.PlaneGeometry(20, 20)
const floorMaterial = new THREE.MeshStandardMaterial({side: THREE.DoubleSide})
const floor = new THREE.Mesh(floorPlane, floorMaterial)
floor.position.set(0, -5, 0)
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true; // 添加阴影
scene.add(floor)

// 创建物理世界
const world = new CANNON.World()
world.gravity.set(0, -9.8,0)
// 创建物理小球
const worldSphere = new CANNON.Sphere(1)
const worldSphereMaterial = new CANNON.Material('sphere')
const worldSphereBody = new CANNON.Body({
    shape: worldSphere,
    position:new CANNON.Vec3(0,0,0),//位置
    mass:1, //质量
    material:worldSphereMaterial
})
// 物体添加到世界
world.addBody(worldSphereBody)

// 创建物理世界的地面
const wordFloorSphere = new CANNON.Plane()
const worldFloorMaterial = new CANNON.Material('floor')
const worldFloorBody = new CANNON.Body({
    material: worldFloorMaterial,
    sphere:wordFloorSphere,
    mass:0,//当质量为0的时候，使得物体保持不动
    position:new CANNON.Vec3(0,-5,0),//位置
})
worldFloorBody.addShape(wordFloorSphere)
// 旋转地面的位置
worldFloorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2)
world.addBody(worldFloorBody)

const defaultContactMaterial = new CANNON.ContactMaterial(
    worldSphereMaterial,
    worldFloorMaterial,
    {
        friction:0.1,//摩擦系数
        restitution:0.7 // 弹性
    }
)
// 将材料的关联设置添加到物理世界
world.addContactMaterial(defaultContactMaterial)

const axesHelp = new THREE.AxesHelper(5)
scene.add(axesHelp);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


document.body.appendChild(renderer.domElement);


const clock = new THREE.Clock();
function render() {
    const deltaTime = clock.getDelta();
    world.step(1/120, deltaTime);
    // 把真实的球和物理世界的球的位置关联起来
    sphere.position.copy(worldSphereBody.position);
    //
    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}
render()

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
})
