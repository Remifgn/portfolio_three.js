import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Planet{
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
            this.debugFolder= this.debug.ui.addFolder('Planet')
        }

        //Setup
        this.ressource = this.ressources.items.planetModel


        this.setModel()
        //this.setMaterial()
        this.update()
    }

    setModel()
    {
        this.model = this.ressource.scene
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = false
            }
        })
    }

    setMaterial()
    {
        this.bakedMaterial = new THREE.MeshBasicMaterial({
            wireframe: true,
            //side: THREE.DoubleSide
        })
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                //child.material = this.bakedMaterial
            }
        })

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