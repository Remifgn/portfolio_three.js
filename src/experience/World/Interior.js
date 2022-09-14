import * as THREE from 'three'
import Experience from "../Experience.js"
import Sign from './Sign.js'

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
        this.createSign()
        this.update()
    }

    setModel()
    {
        this.modelStructure = this.ressource_sturcture.scene
        this.modelStructure.scale.set(0.2, 0.2, 0.2)
        this.scene.add(this.modelStructure)

        this.modelObjects = this.ressource_objects.scene
        this.logos = []
        const insaLogo = this.modelObjects.children.find(child => child.name === 'insa_logo')
        this.logos.push(insaLogo)
        this.experience.objectToTest.push(insaLogo)
        const strathclydeLogo = this.modelObjects.children.find(child => child.name === 'strathclyde_logo')
        this.experience.objectToTest.push(strathclydeLogo)
        this.logos.push(strathclydeLogo)
        const githubLogo = this.modelObjects.children.find(child => child.name === 'github_logo')
        this.experience.objectToTest.push(githubLogo)
        this.logos.push(githubLogo)
        const artlineLogo = this.modelObjects.children.find(child => child.name === 'artline_logo')
        this.experience.objectToTest.push(artlineLogo)
        this.logos.push(artlineLogo)
        const linkedinLogo = this.modelObjects.children.find(child => child.name === 'linkedin_logo')
        this.experience.objectToTest.push(linkedinLogo)
        this.logos.push(linkedinLogo)
        const instagramLogo = this.modelObjects.children.find(child => child.name === 'instagramme_logo')
        this.experience.objectToTest.push(instagramLogo)
        this.logos.push(instagramLogo)
        const upworkLogo = this.modelObjects.children.find(child => child.name === 'upwork_logo')
        this.experience.objectToTest.push(upworkLogo)
        this.logos.push(upworkLogo)
        console.log(this.experience.objectToTest)


        this.modelObjects.scale.set(0.2, 0.2, 0.2)
        this.scene.add(this.modelObjects)

        this.modelObjects.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
        this.modelStructure.traverse((child) =>
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

        this.materialStructure = new THREE.MeshBasicMaterial({
            map: textureStructure,
        })

        this.InteriorStructureWithTexture = this.ressource_sturcture.scene.children.find(child => child.name === 'merged_interior_structure')
        this.InteriorStructureWithTexture.material = this.materialStructure

        const textureObject = this.experience.ressources.items.interiorObjectsBakedTexture
        textureObject.flipY = false
        textureObject.encoding = THREE.sRGBEncoding

        this.materialObject = new THREE.MeshBasicMaterial({
            map: textureObject,
        })

        this.ressource_objects.scene.traverse((child) =>
        {
            child.material = this.materialObject
        })
    }

    createSign()
    {
        const sign2Params = {}
        sign2Params.name = 'sign2'
        sign2Params.cameraPosition = new THREE.Vector3(-2.166, 1.73, 0.11)
        sign2Params.position = new THREE.Vector3(0, 0.5 , -0.5)
        sign2Params.rotation = new THREE.Vector3(0, Math.PI * 1.5 , 0)
        this.sign2 = new Sign(sign2Params)
    }

    destroy()
    {
        this.modelObjects.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
        this.scene.remove(this.modelObjects)

        this.modelStructure.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
        this.scene.remove(this.modelStructure)

        this.sign2.sign.plane.geometry.dispose()
        this.sign2.sign.plane.material.dispose()
        this.scene.remove(this.sign2.sign.plane)

        const removeFromObjectToTest = (item) => {
            var index = this.experience.objectToTest.indexOf(item)
            if (index !== -1) {
                this.experience.objectToTest.splice(index, 1)
            }
        }
        for(const logo of this.logos)
        {
            removeFromObjectToTest(logo)
        }

        removeFromObjectToTest(this.sign2.sign.plane)
    }

    update()
    {
    }
}