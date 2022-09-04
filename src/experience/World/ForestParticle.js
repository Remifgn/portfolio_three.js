import * as THREE from 'three'
import Experience from "../Experience.js"

export default class ForestParticle{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources= this.experience.ressources
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('Forest_Particle')
        }

        //Setup 
        
        this.importModel()

        this.generateForest()

        

        this.update()
    }

    setModel()
    {
        this.model = this.ressources.items.
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