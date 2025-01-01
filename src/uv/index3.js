import *  as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// 场景
const sense = new THREE.Scene()

// 材质偏移
const textureLoad = new THREE.TextureLoader()
const texture = textureLoad.load('../../static/image/long.png')

texture.wrapS = THREE.RepeatWrapping //便宜之后 自动拼接
texture.offset.x += 0.5

// 盒子
const geometry = new THREE.PlaneGeometry(200, 20)
const material = new THREE.MeshBasicMaterial({ map: texture })//镜面反射
const mesh = new THREE.Mesh(geometry, material)




sense.add(mesh)

// 坐标系
const axesHelp = new THREE.AxesHelper(80)
sense.add(axesHelp)


// 自然光  
const ambient = new THREE.AmbientLight(0xffffff, 1)
sense.add(ambient)

// 相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 2000) //arg1:视锥体垂直视野角度 arg2:视锥体长宽比 width/height arg3:摄像机视锥体近端面  arg4:摄像机视锥体远端面
camera.position.set(200, 200, 200)// 相机位置
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


render.render(sense, camera)


// 动画
function animate() {
    texture.offset.x += 0.001
    render.render(sense, camera) //周期性渲染的时候，重现渲染画布
    window.requestAnimationFrame(animate)
}
animate()

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