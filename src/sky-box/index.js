import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

let renderer,camera,scene
let sphere = []

let axesHelper
let controls
let textureCube

initRenderer()
initScene()
initCamera()
initMesh()
initControls()
// initAxesHelper()
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
    textureCube = new THREE.CubeTextureLoader().setPath( 'static/textures/cube/Bridge2/' ).load([
        'posx.jpg',
        'negx.jpg',
        'posy.jpg',
        'negy.jpg',
        'posz.jpg',
        'negz.jpg'
    ])
    scene.background = textureCube
}

// 初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(2,2,2)
    camera.lookAt(0,0,0)
}
function initMesh(){
    const geometry = new THREE.SphereGeometry(0.1,10,10)
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        envMap: textureCube //添加之后
    })

    for(let i=0; i<500; i++) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = Math.random() * 10-5
        mesh.position.y = Math.random() * 10-5
        mesh.position.z = Math.random() * 10-5
        mesh.scale.x =mesh.scale.y = mesh.scale.z = Math.random() * 3+1
        scene.add(mesh)
        sphere.push(mesh)
    }
}


// 初始化坐标轴
function initAxesHelper(){
    axesHelper = new THREE.AxesHelper(3)
    scene.add(axesHelper)
}

// 初始化 render函数
function animate(){
    const timer = Date.now()/1000
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)

    for(let i=0; i<500; i++) {
        const s = sphere[i]
        s.position.x = Math.cos(timer + i)*5
        s.position.y = Math.tan(timer + i * 2)*5
    }
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