import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()


//相机
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2000)
camera.position.set(0, 0, 200)
scene.add(camera)

// 球体纹理 起始就是图片
const textLoad = new THREE.TextureLoader()
const img = textLoad.load('../../static/image/bg.jpg')

// 球体
const geometry = new THREE.SphereGeometry(30, 30, 30)
const material = new THREE.MeshBasicMaterial({ map: img, side: THREE.DoubleSide })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 光源
const AmbientLight = new THREE.AmbientLight('#ffffff', 1)
scene.add(AmbientLight)

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight) //画布的大小
renderer.render(scene, camera)

// 添加到body 中
document.body.appendChild(renderer.domElement)

// 轨道可以设置  旋转
const control = new OrbitControls(camera, renderer.domElement)
control.addEventListener('change', function () {
  renderer.render(scene, camera)
})

function animate() {
  // mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}
animate()