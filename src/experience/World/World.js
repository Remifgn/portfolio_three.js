import * as THREE from 'three'

import Experience from '../Experience.js'
import Environment from './Environment.js'
import Ressources from '../utils/Ressources.js'
import Ground from './Ground.js'
import WoodCabin from './WoodCabin.js'
import Forest from './Forest.js'
import Interior from './Interior.js'
import Sign from './Sign.js'
import Flowers from './Flowers.js'
import Smoke from './Smoke.js'

export default class World{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.actions = this.experience.actions



        this.pivot = this.experience.pivot
        this.scene.add(this.pivot)

        this.actions.on('leaveSpace', () =>
        {

            this.woodCabin = new WoodCabin()
            //this.interior = new Interior()

            // const sign1Params = {}
            // sign1Params.name = 'sign1'
            // sign1Params.cameraPosition = new THREE.Vector3(-2.166, 1.73, 0.11)
            // sign1Params.position = new THREE.Vector3(1.3, 0.7, 3.29)
            // sign1Params.rotation = new THREE.Vector3(0, 0, 0)
            // this.sign1 = new Sign(sign1Params)
        })

        this.actions.on('displayResumeButton', () =>
        {
            this.woodCabin.point.element.classList.add('visible')
        })

        this.actions.on('interiorView', () =>
        {

            this.camera = this.experience.camera
            console.log(this.woodCabin.point.element)
            this.woodCabin.point.element.classList.remove('visible')
            console.log(this.woodCabin.point.element)

            this.woodCabin.destroy()
            this.interior = new Interior()
            const duration =2

            this.camera.transitions.interior(duration)

            setTimeout(() => {
                this.camera.camAngle.interior(this.interior.modelObjects.position)
                console.log('pin')
            }, duration)

            this.rotationSpeed = 0

        })

    }

    update()
    {
        if (this.woodCabin)
        {
            this.woodCabin.update()
        }

    }
}