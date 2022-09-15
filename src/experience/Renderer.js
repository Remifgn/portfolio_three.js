import * as THREE from 'three'

import Experience from "./Experience";


export default class Renderer{
    constructor(){
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('renderer')
        }


        this.setInstance()

    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        })

        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        if(this.debug.active)
        {
            this.debugParams = {}
            this.debugParams.color = 0x009ceb

            this.debugFolder
                .addColor(this.debugParams, 'color')
                .onChange(() =>
                {
                    this.instance.setClearColor(this.debugParams.color)
                })
        }
        this.instance.setClearColor(0x009ceb)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        if (this.experience.postprocessing == null)
        {
            this.instance.render(this.scene, this.camera.instance)
        }
    }

}