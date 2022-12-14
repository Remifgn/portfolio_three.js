import * as THREE from 'three'

import Experience from "../experience.js"

export default class Floor{
    constructor()
    {
        this.experiece = new Experience()
        this.scene = this.experiece.scene
        this.ressources= this.experiece.ressources
        this.setGeometry()
        this.setTexture()
        this.setMaterial()
        this.setMesh()

    }

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    setTexture()
    {
        this.textures = {}
        this.textures.color = this.ressources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping
        this.textures.normal = this.ressources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(
            this.geometry,
            this.material
        )
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true

        this.scene.add(this.mesh)
    }
}