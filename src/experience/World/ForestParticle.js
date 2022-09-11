import * as THREE from 'three'
import Experience from "../Experience.js"

export default class ForestParticle{
    constructor()
    {
        this.experience = new Experience()
        this.ressources= this.experience.ressources
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Tree')
        }

        //Setup
        this.setModel()
        this.setMaterial()

    }

    setModel()
    {
        this.model = this.ressources.items.forestParticleModel.scene
        console.log(this.model)
        this.scale = 0.2
        for (const child of this.model.children[0].children)
        {
            child.scale.set(this.scale, this.scale, this.scale)
        }


        if(this.debug.active)
        {
            this.debugFolder
                .add(this, 'scale')
                .name('tree scale')
                .min(0)
                .max(10)
                .step(0.001)
        }


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
        // this.texture={}
        // this.texture.color = this.ressources.items.forestParticleTexture
        // this.texture.flipY = false
        // this.texture.encoding = THREE.sRGBEncoding
        // this.material= new THREE.MeshBasicMaterial({
        //     map: this.texture,
        // })

        // this.model.traverse((child) =>
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         child.material = this.material
        //     }
        // })

    }



    update()
    {
    }


}