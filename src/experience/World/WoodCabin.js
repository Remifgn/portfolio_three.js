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
        this.update()
    }

    setModel()
    {
        this.model = this.ressource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
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
        
    }

    update()
    {
    }


}