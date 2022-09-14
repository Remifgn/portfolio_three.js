import * as THREE from 'three'

import Experience from "../Experience.js"

export default class Ground{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources

        this.debug = this.experience.debug
        //Debug
        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('woodCabin')
        }

        this.setModelGround()
        this.setMaterialGround()
        this.setModelTerrain()
        this.setMaterialTerrain()
    }

    setModelGround()
    {
        this.modelGround = this.ressources.items.groundModel.scene.children[0]
        if (this.debug.active)
        {
            this.debugFolder
                .add(this.modelGround.position, 'y')
                .name('ground y position')
                .min(-10)
                .max(10)
                .step(0.001)
        }
        this.modelGround.scale.set(0.2, 0.2, 0.2)
        this.modelGround.position.y = -0.275
        this.scene.add(this.modelGround)

        this.modelGround.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setMaterialGround()
    {
        this.textureGround = this.experience.ressources.items.groundBakedTexture
        this.textureGround.flipY = false
        this.textureGround.encoding = THREE.sRGBEncoding

        this.materialGround = new THREE.MeshBasicMaterial({
            map: this.textureGround,
        })

        this.modelGround.material = this.materialGround
    }

    setModelTerrain()
    {
        this.modelTerrain = this.ressources.items.terrainModel.scene
        this.modelTerrain.scale.set(0.2, 0.2, 0.2)
        this.scene.add(this.modelTerrain)

        this.modelTerrain.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setMaterialTerrain()
    {
        this.textureTerrain = this.experience.ressources.items.terrainTexture
        this.textureTerrain.flipY = false
        this.textureTerrain.encoding = THREE.sRGBEncoding

        this.materialTerrain = new THREE.MeshBasicMaterial({
            map: this.textureTerrain,
        })
        this.modelTerrain.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.material = this.materialTerrain
            }
        })

    }
}