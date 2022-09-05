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
        this.setModel()
        this.setMaterial()

        //this.generateForest()

        

        this.update()
    }

    setModel()
    {
        this.model = this.ressources.items.forestParticleModel.scene
        this.scale = 0.2
        this.model.scale.set(this.scale, this.scale, this.scale)

        if(this.debug.active)
        {
            this.debugObject = {}
            this.debugObject.scale = 0.2
            this.scale = this.debugObject.scale
            this.debugFolder
                .add(this.model.position, 'x')
                .name('trees x postion')
                .min(-10)
                .max(10)
                .step(0.001)
            this.debugFolder
                .add(this.model.position, 'y')
                .name('trees y postion')
                .min(-10)
                .max(10)
                .step(0.001)
            this.debugFolder
                .add(this.model.position, 'z')
                .name('trees z postion')
                .min(-10)
                .max(10)
                .step(0.001)
            this.debugFolder
                .add(this.debugObject, 'scale')
                .name('trees scale')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(() =>
                {
                    this.model.scale.set(this.debugObject.scale, this.debugObject.scale, this.debugObject.scale)
                })
        }   

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