import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

let renderer,camera,scene

let controls



initRenderer()
initCamera()
initScene()
initControls()
animation()

// 初始化render
function initRenderer() {
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
}

// 初始化场景
function initScene() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x888888)
}

// 初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(2,2,2)
    camera.lookAt(0,0,0)
}

// 初始化 render函数
function animation(){
    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
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