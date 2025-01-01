import * as THREE from 'three'

// 空集合体
const geometry = new THREE.SphereGeometry(30)

// 材质
const material = new THREE.MeshLambertMaterial({
    wireframe:true //是否显示细分数
})

// 生成点模型对象
const mesh = new THREE.Mesh(geometry, material)

export default mesh