import *  as THREE from 'three'

// 场景
const sense = new THREE.Scene()

// 盒子
const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshBasicMaterial({color: 0x0000ff, transparent: true, opacity: 0.8})
const mesh = new THREE.Mesh(geometry, material)
sense.add(mesh)

// 坐标系
const axesHelp = new THREE.AxesHelper(80)
sense.add(axesHelp)


// 相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 2000) //arg1:视锥体垂直视野角度 arg2:视锥体长宽比 width/height arg3:摄像机视锥体近端面  arg4:摄像机视锥体远端面
camera.position.set(200, 200, 200)// 相机位置
camera.lookAt(mesh.position) //相机查看的 模型
sense.add(camera)


// 渲染器
const render = new THREE.WebGLRenderer()
render.setSize(window.innerWidth, window.innerHeight) //画布的大小
render.render(sense, camera)


// 最后添加到body中
document.body.appendChild(render.domElement)
