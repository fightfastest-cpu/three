import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

let renderer,camera,scene
let mesh

let hesLight,spotLight,dirLight
let axesHelper
let controls



initRenderer()
initCamera()
initScene()
initControls()
initLight()
initAxesHelper()
initMeshes()
animate()

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

function initLight(){
    // 环境光
    hesLight = new THREE.AmbientLight(0x404040)
    scene.add(hesLight)


    dirLight = new THREE.DirectionalLight(0xffffff,10)
    dirLight.name = 'dirLight'
    dirLight.position.set(10,10,5)
    scene.add(dirLight)
}

function initMeshes(){
    const geometry = new THREE.BoxGeometry(1,1,1)
    let material = new THREE.MeshPhongMaterial({color:0xff0000})
    mesh = new THREE.Mesh(geometry,material)
    scene.add(mesh)

}

// 初始化坐标轴
function initAxesHelper(){
    axesHelper = new THREE.AxesHelper(3)
    scene.add(axesHelper)
}

// 初始化 render函数
function animate(){
    renderer.render(scene, camera)
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