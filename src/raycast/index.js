import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 20)
scene.add(camera);

const geometry = new THREE.BoxGeometry(1,1,1)

const material = new THREE.MeshBasicMaterial({
    wireframe: true, //将几何体渲染为线框
})

const boxArr = []
for(let i=-5;i<5;i++){
    for(let j=-5;j<5;j++){
        for(let k=-5;k<5;k++){
            const box = new THREE.Mesh(geometry, material)
            box.position.set(i,j,k)
            scene.add(box)
            boxArr.push(box)
        }
    }
}

const mouse = new THREE.Vector2()
const redmaterial = new THREE.MeshBasicMaterial({color:'red'})

const raycaster = new THREE.Raycaster();
window.addEventListener("click", (event) => {
    mouse.x = (event.clientX/window.innerWidth)*2-1;
    mouse.y = -((event.clientY/window.innerHeight)*2-1);

    raycaster.setFromCamera(mouse, camera)
    const result = raycaster.intersectObjects(boxArr)
    if(result.length){
        result[0].object.material = redmaterial
    }
})

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


document.body.appendChild(renderer.domElement);



function render() {
    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}
render()

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
})
