import * as THREE from 'three'

import Experience from '../Experience.js'
import Environment from './Environment.js'
import Ressources from '../utils/Ressources.js'
import Ground from './Ground.js'
import WoodCabin from './WoodCabin.js'
import Forest from './Forest.js'
import Interior from './Interior.js'
import Sign from './Sign.js'

export default class World{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources

        this.ressources.on('ready', () =>
        {
            // Setup
            this.ground = new Ground()
            this.woodCabin = new WoodCabin()
            //this.interior = new Interior()
            const sign1CameraPosition = new THREE.Vector3(-3.29, 2.23, 0.74)
            this.sign1 = new Sign(sign1CameraPosition)
            this.experience.objectToTest.push(this.sign1.sign.plane)
            this.forest = new Forest()
            this.environment = new Environment()

        })

    }
    update()
    {
        if(this.woodCabin)
        {
            this.woodCabin.update()
        }
        // if(this.forest)
        // {
        //     this.forest.update()
        // }
    }
}