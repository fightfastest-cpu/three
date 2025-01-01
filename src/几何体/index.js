import  *  as THREE  from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import point from './point'
import line from './line';
import mesh from './mesh';
import rect from './rect';
import pointRect from './point-rect'
import sphere from './sphere'


// 场景
const sense = new THREE.Scene()

// 盒子
sense.add(sphere)

// 坐标系
const axesHelp = new THREE.AxesHelper(200)
sense.add(axesHelp)


// 点光源
const pointLight = new THREE.PointLight(0xffffff,1.0)
pointLight.decay = 0 // 光源衰减度  如果是0，表示不衰减
pointLight.position.set(300,300,300)
sense.add(pointLight)

// 相机
const camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,0.1,2000) //arg1:视锥体垂直视野角度 arg2:视锥体长宽比 width/height arg3:摄像机视锥体近端面  arg4:摄像机视锥体远端面
camera.position.set(200,200,200)// 相机位置
sense.add(camera)

// 渲染器
const render = new THREE.WebGLRenderer()
render.setSize(window.innerWidth,window.innerHeight) //画布的大小
render.render(sense,camera)

// 最后添加到body中
document.body.appendChild(render.domElement)

// 相机轨道  OrbitControls 
const control = new OrbitControls(camera,render.domElement)
control.addEventListener('change',function(){
    render.render(sense,camera)
})

