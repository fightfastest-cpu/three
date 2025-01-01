import *  as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// 场景
const sense = new THREE.Scene()

// const textLoad = new THREE.TextureLoader()
// const texture = textLoad.load('../../static/image/bg.jpg')
// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping
// texture.repeat.set(6, 6)


const grid = new THREE.GridHelper(100, 100, 'red', 'black')
sense.add(grid)



// 盒子
const geometry = new THREE.BoxGeometry(30, 30, 30)
const material = new THREE.MeshBasicMaterial({ color: 'red', })//镜面反射
const mesh = new THREE.Mesh(geometry, material)
mesh.rotateX(0.2)


console.log(geometry.attributes.uv)



sense.add(mesh)

// 坐标系
const axesHelp = new THREE.AxesHelper(80)
sense.add(axesHelp)


// 自然光  
const ambient = new THREE.AmbientLight(0xffffff, 1)
sense.add(ambient)

// 相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 2000) //arg1:视锥体垂直视野角度 arg2:视锥体长宽比 width/height arg3:摄像机视锥体近端面  arg4:摄像机视锥体远端面
camera.position.set(100, 100, 100)// 相机位置
camera.lookAt(mesh.position) //相机查看的 模型
sense.add(camera)



// 渲染器
const render = new THREE.WebGLRenderer({ antialias: true })
render.setSize(window.innerWidth, window.innerHeight) //画布的大小
render.render(sense, camera)
// 设置设备像素比
render.setPixelRatio(window.devicePixelRatio)
render.setClearColor(0x444444)

// 最后添加到body中
document.body.appendChild(render.domElement)

// // 动画
// function animate() {
//     mesh.rotateY(0.01) //周期性渲染
//     render.render(sense, camera) //周期性渲染的时候，重现渲染画布
//     window.requestAnimationFrame(animate)
// }
// animate()

render.render(sense, camera)

// 相机轨道  OrbitControls 
const control = new OrbitControls(camera, render.domElement)
control.addEventListener('change', function () {
    render.render(sense, camera)
})

// 屏幕变化
window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
}