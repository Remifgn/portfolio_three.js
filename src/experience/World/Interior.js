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
        this.pivot = this.experience.world.pivot

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
        this.modelParams = {
            scale: 1.141,
            xPosition: -0.226,
            yPosition: 1.299,
            zPosition: 1.299,
            xRotation: 0.124
        }

        this.modelStructure = this.ressource_sturcture.scene
        this.modelStructure.scale.set(this.modelParams.scale, this.modelParams.scale, this.modelParams.scale)
        this.modelStructure.position.set(this.modelParams.xPosition, this.modelParams.yPosition, this.modelParams.zPosition)
        this.modelStructure.rotation.x = this.modelParams.xRotation
        this.pivot.add(this.modelStructure)

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


        this.modelObjects.scale.set(this.modelParams.scale, this.modelParams.scale, this.modelParams.scale)
        this.modelObjects.position.set(this.modelParams.xPosition, this.modelParams.yPosition, this.modelParams.zPosition)
        this.modelObjects.rotation.x = this.modelParams.xRotation

        this.pivot.add(this.modelObjects)

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.modelParams,'scale')
                .name('cabin scale')
                .min(0)
                .max(2)
                .step(0.001)
                .onChange(() =>
                {
                    this.modelStructure.scale.set(this.modelParams.scale, this.modelParams.scale, this.modelParams.scale)
                    this.modelObjects.scale.set(this.modelParams.scale, this.modelParams.scale, this.modelParams.scale)
                })
            this.debugFolder
                .add(this.modelParams, 'xPosition')
                .name('cabin x')
                .min(-20)
                .max(20)
                .step(0.001)
                .onChange(() =>
                {
                    this.modelStructure.position.x = this.modelParams.xPosition
                    this.modelObjects.position.x = this.modelParams.xPosition
                })
            this.debugFolder
                .add(this.modelParams, 'yPosition')
                .name('cabin y')
                .min(-20)
                .max(20)
                .step(0.001)
                .onChange(() =>
                {
                    this.modelStructure.position.y = this.modelParams.yPosition
                    this.modelObjects.position.y = this.modelParams.yPosition
                })
            this.debugFolder
                .add(this.modelParams, 'zPosition')
                .name('cabin z')
                .min(-20)
                .max(20)
                .step(0.001)
                .onChange(() =>
                {
                    this.modelStructure.position.z = this.modelParams.zPosition
                    this.modelObjects.position.z = this.modelParams.zPosition
                })
            this.debugFolder
                .add(this.modelParams, 'xRotation')
                .name('x rot')
                .min(-Math.PI)
                .max(Math.PI)
                .step(0.001)
                .onChange(() =>
                {
                    this.modelStructure.rotation.x = this.modelParams.xRotation
                    this.modelObjects.rotation.x = this.modelParams.xRotation
                })

        }



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

    // createSign()
    // {
    //     const sign2Params = {}
    //     sign2Params.name = 'sign2'
    //     sign2Params.cameraPosition = new THREE.Vector3(-2.166, 1.73, 0.11)
    //     sign2Params.position = new THREE.Vector3(0, 0.5 , -0.5)
    //     sign2Params.rotation = new THREE.Vector3(0, Math.PI * 1.5 , 0)
    //     this.sign2 = new Sign(sign2Params)
    // }

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