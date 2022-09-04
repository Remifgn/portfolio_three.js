import Experience from '../Experience.js'
import Environment from './Environment.js'
import Ressources from '../utils/Ressources.js'
import Floor from './Floor.js'
import WoodCabin from './WoodCabin.js'
import ForestParticle from './ForestParticle.js'

export default class World{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources

        this.ressources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.woodCabin = new WoodCabin()
            this.forestParticle = new ForestParticle()
            this.environment = new Environment()
            
        })

    }
    update()
    {
        if(this.woodCabin)
        {
            this.woodCabin.update()
        }
    }
}