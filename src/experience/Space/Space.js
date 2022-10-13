import * as THREE from 'three'

import Experience from '../Experience.js'
import Environment from '../World/Environment.js'
import Ressources from '../utils/Ressources.js'
import Satellite from './Satellite.js'
import TextParticle from './TextParticle.js'
import SpaceEnvironment from './SpaceEnvironment.js'
import Planet from './Planet.js'
import LogoParticle from './LogoParticle.js'
import RadarChart from './RadarChart.js'
import HtmlDisplay from './HtmlDisplay.js'


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
            this.ready = false

            this.environment = new SpaceEnvironment()
            this.planet = new Planet()

            this.satellite = new Satellite()

            this.htmlDisplay = new HtmlDisplay()

            this.textParticle = new TextParticle()

            this.skillsLogos = ['blender', 'python', 'git', 'c', 'js', 'html']
            this.createLogos(this.skillsLogos)
            // const blenderPosition = new THREE.Vector3(-390, -208, 400)
            // this.blenderParticle = new LogoParticle('blender', blenderPosition)
            // const pythonPosition = new THREE.Vector3(-376, -208, 400)
            // this.pythonParticle = new LogoParticle('python', pythonPosition)
            // const gitPosition = new THREE.Vector3(-363, -208, 400)
            // this.gitParticle = new LogoParticle('git', gitPosition)
            // const cPosition = new THREE.Vector3(-390, -220, 400)
            // this.cParticle = new LogoParticle('c', cPosition)
            // const jsPosition = new THREE.Vector3(-376, -220, 400)
            // this.jsParticle = new LogoParticle('js', jsPosition)
            // const htmlPosition = new THREE.Vector3(-363, -220, 400)
            // this.htmlParticle = new LogoParticle('html', htmlPosition)

            this.actions.on('leaveSpace', () =>
            {
                this.leaveSpace()
            })

            this.ready = true
        })

    }

    createLogos(skillsLogos)
    {
        this.logosParticles = []
        let idx = 0
        for (var logoName of skillsLogos)
        {

            const position = new THREE.Vector3(-390 + (idx % 3) * 15,((idx > 2)? -220: -208), 400 )
            const logoParticle = new LogoParticle(logoName, position)
            console.log(logoName)
            console.log(position)
            this.logosParticles.push(logoParticle)
            idx ++
        }
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
        for (const logosParticle of this.logosParticles)
        {
            logosParticle.destroy()
        }

    }

    update()
    {
        if(this.ready)
        {
            this.planet.update()
            this.satellite.update()
            this.textParticle.update()
            this.htmlDisplay.update()
            for (const logosParticle of this.logosParticles)
            {
                logosParticle.update()
            }

        }
    }
}