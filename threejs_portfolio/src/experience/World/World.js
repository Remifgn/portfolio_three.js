import Experience from '../experience.js'
import Environment from './Environment.js'
import Ressources from '../utils/Ressources.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

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
            this.fox = new Fox()
            this.environment = new Environment()
            
        })

    }
    update()
    {
        if(this.fox)
        {
            this.fox.update()
        }
    }
}