import * as THREE from 'three'

import Sizes from "./utils/Sizes.js"
import Time from "./utils/Time.js"
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Ressources from './utils/Ressources.js'
import sources from './sources.js'
import Debug from './utils/Debug.js'
import Mouse from './utils/Mouse.js'
import Raycaster from './utils/Raycaster.js'
import PostProcessing from './Postprocessing.js'
import CamControls from './CamControls.js'
import Actions from './Actions.js'

let instance = null

export default class Experience{
    constructor(canvas)
    {
        if(instance)
        {
            return instance
        }

        instance = this

        //global access
        window.experience = this

        //Option
        this.canvas = canvas
        console.log(this.canvas)

        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()

        this.time = new Time()
        this.scene = new THREE.Scene()
        this.ressources = new Ressources(sources)
        this.camera = new Camera()
        this.camcontrols = new CamControls()
        this.mouse = new Mouse()

        this.renderer = new Renderer()

        // !! World and raycaster must be instanciated befor raycaster
        this.objectToTest = []

        this.world = new World()
        this.raycaster = new Raycaster(this.objectToTest)
        this.postprocessing = new PostProcessing()
        this.actions = new Actions()

        // Sizes resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })

    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        this.postprocessing.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
        this.raycaster.testMouseRay()
        this.postprocessing.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    if (value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
    }
}