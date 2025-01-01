import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {PDBLoader} from 'three/examples/jsm/loaders/PDBLoader.js'
import {CSS2DObject,CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

let renderer,camera,scene

let controls

let css2DRenderer

initRenderer()
initCamera()
initScene()
initLight()
initMesh()
initControls()
initCSS2DRenderer()
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
function initLight(){
    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    scene.add(directionalLight);
}
function initMesh() {
    const loader = new PDBLoader()
    loader.load('static/models/pdb/caffeine.pdb',function (pdb){
        //  geometryAtoms: colors ［24］，position ［24］：原子模型的颜色和位置
        // geometryBonds: position ［50］， 25 对化学键
        // json:atoms ［24］，0-2：位置信息，3：颜色，4：label；描述标签的。
        console.log(pdb);
        let positions = pdb.geometryAtoms.getAttribute('position')
        let colors = pdb.geometryAtoms.getAttribute('color')


        // 原子模型的颜色和位置
        const position = new THREE.Vector3()
        const color = new THREE.Color()
        for(let i=0;i<positions.count;i++){
            position.x = positions.getX(i)
            position.y = positions.getY(i)
            position.z = positions.getZ(i)

            color.r = colors.getX(i)
            color.g = colors.getY(i)
            color.b = colors.getZ(i)

        //     mesh
            console.log('color', color);
            const geometry = new THREE.IcosahedronGeometry(0.3,3)
            const material = new THREE.MeshPhongMaterial({color: color})
            const object = new THREE.Mesh(geometry,material)
            object.position.copy(position)
            scene.add(object)
        }
    //     化学键
        positions = pdb.geometryBonds.getAttribute('position')
        const start = new THREE.Vector3()
        const end = new THREE.Vector3()
        for(let i=0;i<positions.count;i+=2){
            start.x = positions.getX(i)
            start.y = positions.getY(i)
            start.z = positions.getZ(i)


            end.x = positions.getX(i+1)
            end.y = positions.getY(i+1)
            end.z = positions.getZ(i+1)

            const geometry = new THREE.BoxGeometry(0.05,0.05)
            const material = new THREE.MeshPhongMaterial({color: 0xffffff})
            const object = new THREE.Mesh(geometry, material)
            object.position.copy(start)
            object.position.lerp(end,0.5)
            object.scale.z = start.distanceTo(end)
            object.lookAt(end)
            scene.add(object)
        }
    //     json
        for(let i=0;i<pdb.json.atoms.length;i++){
            const text = document.createElement('div')
            const atom = pdb.json.atoms[i]
            const rgb = `rgb(${atom[3][0]},${atom[3][1]},${atom[3][2]})`
            text.style.color = rgb
            text.textContent = atom[4]
            position.x = atom[0]
            position.y = atom[1]
            position.z = atom[2]
            const label = new CSS2DObject(text)
            label.position.copy(position)
            console.log('label', position);
            scene.add(label)
        }
    })

}

// 初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0,0,10)
    camera.lookAt(0,0,0)
}
function initCSS2DRenderer(){
    css2DRenderer = new CSS2DRenderer()
    css2DRenderer.setSize(window.innerWidth, window.innerHeight)
    css2DRenderer.domElement.style.position = 'absolute'
    css2DRenderer.domElement.style.pointerEvents = 'none'
    document.body.appendChild(css2DRenderer.domElement)

}
// 初始化 render函数
function animation(){
    renderer.render(scene, camera)
    css2DRenderer.render(scene, camera)
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