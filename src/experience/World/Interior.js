import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Interior{
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
            this.debugFolder= this.debug.ui.addFolder('interior')
        }

        //Setup
        this.ressource_sturcture = this.ressources.items.interiorStructure
        this.ressource_objects = this.ressources.items.interiorObjectModel

        this.setModel()
        this.setMaterial()
        this.update()
    }

    setModel()
    {
        this.model = this.ressource_sturcture.scene
        this.model.scale.set(0.2, 0.2, 0.2)
        this.scene.add(this.model)
        this.model = this.ressource_objects.scene
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
        const textureStructure = this.experience.ressources.items.houseInteriorBakedTexture
        textureStructure.flipY = false
        textureStructure.encoding = THREE.sRGBEncoding

        const materialStructure = new THREE.MeshBasicMaterial({
            map: textureStructure,
        })

        this.InteriorStructureWithTexture = this.ressource_sturcture.scene.children.find(child => child.name === 'merged_interior_structure')
        this.InteriorStructureWithTexture.material = materialStructure

        const textureObject = this.experience.ressources.items.interiorObjectsBakedTexture
        console.log(textureObject)
        textureObject.flipY = false
        textureObject.encoding = THREE.sRGBEncoding

        const materialObject = new THREE.MeshBasicMaterial({
            map: textureObject,
        })

        this.ressource_objects.scene.traverse((child) =>
        {
            child.material = materialObject
        })
    }

    update()
    {
    }
}