import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js"

let renderer,camera,scene

let hesLight,spotLight,dirLight
let controls
let clock = new THREE.Clock()
let mixer

let plane,model

// initLight()
// initShadow()

init()
loadModal()
animate()


function init(){
    // renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // 相机
    camera = new THREE.PerspectiveCamera(40,window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(5,2,8)
    camera.lookAt(0,0,0)

//     场景
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x888888)
    scene.fog = new THREE.Fog(0xa0a0a0,10,50)


    //     controls
    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0,1,0)
    controls.update()
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

function loadModal(){
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/js/libs/draco/gltf')
    loader.setDRACOLoader(dracoLoader)
    loader.load('../../static/models/gltf/LittlestTokyo.glb',function (gltf){
        console.log(gltf);
    })
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

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})