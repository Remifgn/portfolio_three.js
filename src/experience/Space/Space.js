import * as THREE from 'three'

import Experience from '../Experience.js'
import Environment from '../World/Environment.js'
import Ressources from '../utils/Ressources.js'
import Satellite from './Satellite.js'
import TextParticle from './TextParticle.js'
import SpaceEnvironment from './SpaceEnvironment.js'
import Planet from './Planet.js'
import LogoParticle from './LogoParticle.js'


export default class Space{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.camera = this.experience.camera
        this.actions = this.experience.actions
        this.ressources.on('ready', () =>
        {
            this.environment = new SpaceEnvironment()
            this.planet = new Planet()

            this.satellite = new Satellite()

            this.textParticle = new TextParticle()
            const blenderPosition = new THREE.Vector3(-390, -208, 400)
            this.blenderParticle = new LogoParticle('blender', blenderPosition)
            const pythonPosition = new THREE.Vector3(-376, -208, 400)
            this.pythonParticle = new LogoParticle('python', pythonPosition)
            const gitPosition = new THREE.Vector3(-363, -208, 400)
            this.gitParticle = new LogoParticle('git', gitPosition)
            const cPosition = new THREE.Vector3(-390, -220, 400)
            this.cParticle = new LogoParticle('c', cPosition)
            const jsPosition = new THREE.Vector3(-376, -220, 400)
            this.jsParticle = new LogoParticle('js', jsPosition)
            const htmlPosition = new THREE.Vector3(-363, -220, 400)
            this.htmlParticle = new LogoParticle('html', htmlPosition)

            this.actions.on('leaveSpace', () =>
            {
                this.leaveSpace()
            })
        })

    }

    leaveSpace()
    {
        this.satellite.moveToOrbit()
        this.satellite.hidePoint()
        this.satellite.hideTerminal()
        this.destroyLogoParticles()
    }

    destroyLogoParticles()
    {
        this.blenderParticle.destroy()
        this.pythonParticle.destroy()
        this.gitParticle.destroy()
        this.cParticle.destroy()
        this.jsParticle.destroy()
        this.htmlParticle.destroy()
    }

    update()
    {
        if(this.htmlParticle)
        {
            this.planet.update()
            this.satellite.update()
            this.textParticle.update()
            this.blenderParticle.update()
            this.pythonParticle.update()
            this.gitParticle.update()
            this.cParticle.update()
            this.jsParticle.update()
            this.htmlParticle.update()
        }
    }
}