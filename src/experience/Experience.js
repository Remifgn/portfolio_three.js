import * as THREE from 'three'

import Sizes from "./utils/Sizes.js"
import Time from "./utils/Time.js"
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Ressources from './utils/Ressources.js'
import LoadingDisplay from './LoadingDisplay.js'
import sources from './sources.js'
import Debug from './utils/Debug.js'
import Mouse from './utils/Mouse.js'
import Raycaster from './utils/Raycaster.js'
import PostProcessing from './Postprocessing.js'
import CamControls from './CamControls.js'
import Actions from './utils/Actions.js'
import Space from './Space/Space.js'

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
        this.loadingDisplay = new LoadingDisplay()


        this.mouse = new Mouse()

        // !! World and raycaster must be instanciated befor raycaster
        this.objectToTest = []
        this.actions = new Actions()
        this.pivot = new THREE.Object3D()
        this.scene.add(this.pivot)
        this.rotationSpeed = Math.PI / (180 * 60)
        this.world = new World()
        this.space = new Space()
        this.camera = new Camera()
        this.camcontrols = new CamControls()
        this.renderer = new Renderer()
        this.raycaster = new Raycaster(this.objectToTest)
        this.postprocessing = new PostProcessing()

        this.ressources.on('ready', () =>
        {
            this.actions.actions.default()
        })


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

        this.actions.on('interiorView', () =>
        {
            this.rotationSpeed = 0
        })

        this.actions.on('orbitView', () =>
        {
            this.rotationSpeed = Math.PI / (180 * 60)
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
        if(this.pivot)
        {
            this.pivot.rotation.y += this.rotationSpeed
        }
        this.camera.update()
        this.world.update()
        this.space.update()
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