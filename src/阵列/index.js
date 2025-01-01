import  *  as THREE  from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



// 场景
const sense = new THREE.Scene()

// 盒子
const geometry = new THREE.BoxGeometry(50,50,50)
const material = new THREE.MeshLambertMaterial({color:0xff0000,transparent:true,opacity:0.9})
for(let i=0;i<5;i++){
    for(let j=0;j<5;j++){
        const mesh = new THREE.Mesh(geometry,material)
        mesh.position.set(i*60,0,j*60)
        sense.add(mesh)
    }
}

// 坐标系
const axesHelp = new THREE.AxesHelper(80)
sense.add(axesHelp)

// 自然光
const ambient = new THREE.AmbientLight(0xffffff,0.4)
sense.add(ambient)

// 相机
const camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,0.1,2000) //arg1:视锥体垂直视野角度 arg2:视锥体长宽比 width/height arg3:摄像机视锥体近端面  arg4:摄像机视锥体远端面
camera.position.set(200,200,200)// 相机位置
camera.lookAt(0,0,0)
sense.add(camera)



// 渲染器
const render = new THREE.WebGLRenderer()
render.setSize(window.innerWidth,window.innerHeight) //画布的大小
render.render(sense,camera)

// 最后添加到body中
document.body.appendChild(render.domElement)


// // 相机轨道  OrbitControls 
const control = new OrbitControls(camera,render.domElement)
control.addEventListener('change',function(){
    render.render(sense,camera)
})

