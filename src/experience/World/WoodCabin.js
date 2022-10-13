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
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes

        //Debug
        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('woodCabin')
        }

        //Setup
        this.ressource = this.ressources.items.woodCabinModel
        this.pivot = this.experience.world.pivot
        this.setModel()
        this.setMaterial()
        this.setHtmlPoint()
    }

    setModel()
    {
        this.model = this.ressource.scene
        this.modelParams = {
            scale: 1,
        }
        this.model.position.set(0, 2.315, 1.3)
        this.model.rotation.x = 0.1242
        this.model.scale.set(this.modelParams.scale, this.modelParams.scale, this.modelParams.scale)
        this.pivot.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

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
                    this.model.scale.set(this.modelParams.scale, this.modelParams.scale, this.modelParams.scale)
                })
            this.debugFolder
                .add(this.model.position, 'x')
                .name('cabin x')
                .min(-20)
                .max(20)
                .step(0.001)
            this.debugFolder
                .add(this.model.position, 'y')
                .name('cabin y')
                .min(-20)
                .max(20)
                .step(0.001)
            this.debugFolder
                .add(this.model.position, 'z')
                .name('cabin z')
                .min(-20)
                .max(20)
                .step(0.001)
            this.debugFolder
                .add(this.model.rotation, 'x')
                .name('cabin xrot')
                .min(-Math.PI)
                .max(Math.PI)
                .step(0.0001)
        }
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


        this.woodCabinWithTexture = this.ressource.scene.children.find(child => child.name === 'cabin')
        this.woodCabinWithTexture.material = this.bakedMaterial
        this.WindowWithTexture = this.ressource.scene.children.find(child => child.name === 'windows')
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
        this.pivot.remove(this.model)
    }

    setHtmlPoint()
    {
        this.point = {
            position: this.pivot.position.clone(),
            element: document.querySelector('.buttonBlock')
        }
        this.buttonScaleFactor = 0.007
        if(this.debug.active)
        {
            this.debugParams.buttonScaleFactor = 0.007
            this.buttonScaleFactor = this.debugParams.buttonScaleFactor

            this.debugFolder
                .add(this.point.position, 'x')
                .name('button x')
                .min(-100)
                .max(100)
                .step(0.1)
            this.debugFolder
                .add(this.point.position, 'y')
                .name('button y')
                .min(-10)
                .max(10)
                .step(0.1)
            this.debugFolder
                .add(this.point.position, 'z')
                .name('button z')
                .min(-100)
                .max(100)
                .step(0.1)
            this.debugFolder
                .add(this.debugParams, 'buttonScaleFactor')
                .name('scale factor')
                .min(0)
                .max(10)
                .step(0.0001)
        }

    }

    update()
    {
        // Go through each point

        // Get 2D screen position
        const screenPosition = this.point.position.clone()
        screenPosition.project(this.camera.instance)


        const translateX = screenPosition.x * this.sizes.width * 0.5 - 125
        const translateY = - screenPosition.y * this.sizes.height * 0.5 - 25
        const scale = 1 / (this.camera.instance.position.distanceTo(this.point.position) * this.buttonScaleFactor)
        // console.log(scale)
        this.point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}, ${scale})`

    }

}