import * as THREE from 'three'

import Experience from '../Experience.js'
import Environment from '../World/Environment.js'
import Ressources from '../utils/Ressources.js'
import Satellite from './Satellite.js'
import TextParticle from './TextParticle.js'
import SpaceEnvironment from './SpaceEnvironment.js'
import Planet from './Planet.js'


export default class Space{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.camera = this.experience.camera

        this.ressources.on('ready', () =>
        {
            this.environment = new SpaceEnvironment()

            this.satelite = new Satellite()

            this.textParticle = new TextParticle()


            this.planet = new Planet()



        })

    }
    update()
    {
        if(this.satelite)
        {
            this.satelite.update()
        }
        if(this.textParticle)
        {
            this.textParticle.update()
        }

    }
}