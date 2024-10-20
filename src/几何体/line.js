import * as THREE from 'three'

// 空集合体
const geometry = new THREE.BufferGeometry()

// 添加顶点数据
const vertices = new Float32Array([
    0,0,0,
    50,0,0,
    0,100,0,
    0,0,10,
    0,0,100,
    50,0,10
])

// 创建缓冲对象
const attribute = new THREE.BufferAttribute(vertices,3)//每3个为一组

// 设置集合体顶点的位置
geometry.attributes.position = attribute

// 点材质
const material = new THREE.PointsMaterial({color:0xffff00,size:10})

// 生成点模型对象
// const point = new THREE.Points(geometry, material)
const line = new THREE.LineLoop(geometry, material)
// Line 非闭合线
// lineLoop 闭合线

export default line