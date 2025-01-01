import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {RapierPhysics} from 'three/examples/jsm/physics/RapierPhysics.js'

let renderer,camera,scene
let hesLight,spotLight,dirLight
let floor, toursKnot,cube
let axesHelper
let controls

let clock = new THREE.Clock()

initRenderer()
initCamera()
initScene()
initControls()
initLight()
initCameraHelp()
initMeshes()
animate()

// 初始化render
function initRenderer() {
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
}
// 初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(2,2,2)
    camera.lookAt(0,0,0)
}
// 初始化场景
function initScene() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x888888)
}


function initLight(){
    // 环境光
    hesLight = new THREE.AmbientLight(0x404040)
    scene.add(hesLight)
// 平行光
    spotLight = new THREE.SpotLight(0xffffff)
    spotLight.name = 'spotLight'
    spotLight.penumbra = 0.3
    spotLight.angle = Math.PI / 5
    spotLight.position.set(10,10,5)
    scene.add(spotLight)

    dirLight = new THREE.DirectionalLight(0xffffff,10)
    dirLight.name = 'dirLight'
    dirLight.position.set(0,10,0)
    scene.add(dirLight)
}

function initMeshes(){
    const geometry = new THREE.TorusKnotGeometry(25,8,750,20)
    let material = new THREE.MeshPhongMaterial({color:0xff0000,shininess:150,specular:0x222222})
    toursKnot = new THREE.Mesh(geometry,material)
    toursKnot.scale.multiplyScalar(1/48)
    scene.add(toursKnot)

}

function initCameraHelp(){
    spotLight.shadow.camera.near = 5
    spotLight.shadow.camera.far = 5
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    scene.add(new THREE.CameraHelper(spotLight.shadow.camera))
}

// 初始化坐标轴
function initAxesHelper(){
    axesHelper = new THREE.AxesHelper(3)
    scene.add(axesHelper)
}

// 初始化 render函数
function animate(){
    renderer.render(scene, camera)
    const delta = clock.getDelta()
    // console.log(delta);
    toursKnot.rotation.x += delta * 0.3
    toursKnot.rotation.y += delta * 0.3
    toursKnot.rotation.z += delta * 0.3
    window.requestAnimationFrame(animate)
}
// 初始化控制器
function initControls(){
    controls = new OrbitControls(camera, renderer.domElement)
}

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})