import * as THREE from 'three'
import Experience from "../Experience.js"

export default class WoodCabin{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources= this.experience.ressources
        this.time = this.experience.time
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('woodCabin')
        }

        //Setup
        this.ressource = this.ressources.items.woodCabinModel

        this.setModel()
        this.setMaterial()
        this.update()
    }

    setModel()
    {
        this.model = this.ressource.scene
        this.model.scale.set(0.2, 0.2, 0.2)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setMaterial()
    {

        this.texture = this.experience.ressources.items.houseBakedTexture
        this.texture.flipY = false
        this.texture.encoding = THREE.sRGBEncoding

        this.debugParams = {}
        this.debugParams.color = 0x908431

        this.bakedMaterial = new THREE.MeshBasicMaterial({
            map: this.texture,
            side: THREE.DoubleSide
        })

        this.windowMaterial = new THREE.MeshBasicMaterial({
            color: this.debugParams.color
        })

        if (this.debug.active) {

            this.debugFolder
                .addColor(this.debugParams,'color')
                .onChange(() =>
                {
                    this.windowMaterial.color.set(this.debugParams.color)
                })
        }


        this.woodCabinWithTexture = this.ressource.scene.children.find(child => child.name === 'merged_house')
        this.woodCabinWithTexture.material = this.bakedMaterial
        console.log(this.ressource.scene.children)
        this.WindowWithTexture = this.ressource.scene.children.find(child => child.name === 'windows_exterior')
        this.WindowWithTexture.material = this.windowMaterial
    }

    destroy()
    {
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
        this.scene.remove(this.model)

    }

    update()
    {
    }


}