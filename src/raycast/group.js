import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

let renderer,camera,scene,meshes
let light
let axesHelper
let controls
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
let white = new THREE.Color(0xffffff)
let color = new THREE.Color()

initRenderer()
initCamera()
initScene()
initAxesHelper()
initControls()
initLight()
initMeshes()
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


function initLight(){
    light = new THREE.HemisphereLight(0xffffff, 0x888888)
    light.position.set(0, 1, 0)
    scene.add(light)
}

// 初始化坐标轴
function initAxesHelper(){
    axesHelper = new THREE.AxesHelper(3)
    scene.add(axesHelper)
}
// 初始化控制器
function initControls(){
    controls = new OrbitControls(camera, renderer.domElement)
}
// 初始化物体 也就是大规模的物体的创建
function initMeshes(){
    const geometry = new THREE.IcosahedronGeometry(0.5,4)//正20面体
    const material = new THREE.MeshPhongMaterial({color: 0xffffff})
    meshes = new THREE.InstancedMesh(geometry, material,10000) //一堆物体，可以定义多个
    let matrix = new THREE.Matrix4()
    let index = 0
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            for(let k=0;k<10;k++){
                matrix.setPosition(4.5-i,4.5-j,4.5-k)
                meshes.setMatrixAt(index,matrix)
                meshes.setColorAt(index,white)
                index+=1
            }
        }
    }
    scene.add(meshes)

}
// 初始化 render函数
function render(){
    renderer.render(scene, camera)

    raycaster.setFromCamera(mouse,camera) //射线
    const intersection = raycaster.intersectObject(meshes) //获取相交的个数
    if(intersection.length > 0){
        const instanceId = intersection[0].instanceId
        meshes.getColorAt(instanceId,color)
        if(color.equals(white)){
            meshes.setColorAt(instanceId, color.setHex(Math.random()* 0xffffff))
            meshes.instanceColor.needsUpdate = true
        }
    }
    window.requestAnimationFrame(render)
}

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

document.addEventListener('mousemove', function(e){
    mouse.x = (e.clientX/window.innerWidth)*2-1
    mouse.y = (e.clientY/window.innerHeight)*2-1
})