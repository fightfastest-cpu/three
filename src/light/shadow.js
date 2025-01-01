import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

let renderer,camera,scene
let axesHelper
let controls
let ambientLight,spotLight
let plain,cyliender

initRenderer()
initCamera()
initScene()
initAxesHelper()
initControls()
initAmbientLight()
initSpotLight()

initMeshes()

initShadow()

render()

// 初始化render
function initRenderer() {
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
}
// 初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera()
    camera.position.set(0, 120, 120)
    camera.lookAt(0,0,0)
}
// 初始化场景
function initScene() {
    scene = new THREE.Scene()
}

// 初始化环境光
function initAmbientLight(){
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)
}
// 初始化电光源
function initSpotLight() {
    spotLight = new THREE.SpotLight(0xffffff, 100000)
    spotLight.position.set(-5, 80, 0);
    spotLight.penumbra  = 0.3 //过度
    scene.add(spotLight)
}
// 初始化坐标轴
function initAxesHelper(){
    axesHelper = new THREE.AxesHelper(50)
    scene.add(axesHelper)
}
// 初始化控制器
function initControls(){
    controls = new OrbitControls(camera, renderer.domElement)
}
// 初始化物体
function initMeshes(){
    const geometryPlain = new THREE.PlaneGeometry(800,400)
    const materialPlain = new THREE.MeshPhongMaterial({color: 0x808080,side:THREE.DoubleSide})
    plain = new THREE.Mesh(geometryPlain,materialPlain)
    plain.rotation.x = -Math.PI/2;
    plain.position.set(0,-10,0);
    scene.add(plain)

    const geometryCylinder = new THREE.CylinderGeometry(5,5,10)
    const materialCylinder = new THREE.MeshPhongMaterial({color: 0x4080ff})
    cyliender = new THREE.Mesh(geometryCylinder,materialCylinder)
    cyliender.position.set(0,30,0);
    scene.add(cyliender)

}
// 初始化 阴影
function initShadow(){
    cyliender.castShadow = true
    plain.receiveShadow = true;
    spotLight.castShadow = true
    renderer.shadowMap.enabled = true
}
// 初始化 render函数
function render(){
    renderer.render(scene, camera)
    window.requestAnimationFrame(render)
}
window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})