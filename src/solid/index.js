import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

let renderer,camera,scene
let mesh

let hesLight,spotLight,dirLight
let axesHelper
let controls
let clock = new THREE.Clock()
let mixer

let plane,model

initRenderer()
initCamera()
initScene()
initMeshes()
initControls()
initLight()
initAxesHelper()
initShadow()
animate()

// 初始化render
function initRenderer() {
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    // renderer.outputEncoding
    renderer.outputEncoding = THREE.sRGBEncoding;

    document.body.appendChild(renderer.domElement)
}

// 初始化场景
function initScene() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x888888)
    scene.fog = new THREE.Fog(0xa0a0a0,10,50)
}

// 初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(1,2,-3)
    camera.lookAt(0,0,0)
}

function initLight(){
    // 环境光
    hesLight = new THREE.AmbientLight(0x404040)
    scene.add(hesLight)


    dirLight = new THREE.DirectionalLight(0xffffff,10)
    dirLight.name = 'dirLight'
    dirLight.position.set(-3,0,-10)
    scene.add(dirLight)
}

function initMeshes(){
     plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100,100),
        new THREE.MeshPhongMaterial({color: 0x999999})
    )
    plane.rotation.x = -Math.PI / 2
    scene.add(plane)


    const loader = new GLTFLoader()
    loader.load('../../static/models/gltf/Soldier.glb',function (gltf) {
        console.log(gltf);
        scene.add(gltf.scene);

        gltf.scene.traverse(obj=>{
            if(obj.isMesh){
                obj.castShadow = true
            }
        })

        const clip = gltf.animations[1]
        mixer = new THREE.AnimationMixer(gltf.scene)
        console.log('mixer', mixer);
        const action = mixer.clipAction(clip)
        action.play()
    })

}

// 初始化坐标轴
function initAxesHelper(){
    // axesHelper = new THREE.AxesHelper(1)
    // scene.add(axesHelper)
}

function initShadow(){
    renderer.shadowMap.enabled = true
    plane.receiveShadow = true;
    dirLight.castShadow = true

}


// 初始化 render函数
function animate(){
    const delta = clock.getDelta()
    window.requestAnimationFrame(animate)
    renderer.render(scene, camera)
    if (mixer){
        mixer.update(delta)
    }
}
// 初始化控制器
function initControls(){
    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0,1,0)
    controls.update()
}

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})