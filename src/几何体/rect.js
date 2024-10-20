import * as THREE from 'three'

// 空集合体
const geometry = new THREE.BufferGeometry()

// 添加顶点数据
const vertices = new Float32Array([
    0,0,0,
    80,0,0,
    80,80,0,
    0,0,0,
    80,80,0,
    0,80,0,
])

// 创建缓冲对象
const attribute = new THREE.BufferAttribute(vertices,3)//每3个为一组

// 设置集合体顶点的位置
geometry.attributes.position = attribute

// 材质
const material = new THREE.MeshBasicMaterial({color:0x00ffff,side:THREE.DoubleSide})

// 生成点模型对象
const mesh = new THREE.Mesh(geometry, material)

export default mesh