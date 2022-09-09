import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'

import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';
import { SobelOutline } from '../shaders/SobelOutline.js';

import Experience from './Experience'

let bloomLayer = null
let darkMaterial = null
let materials = null

export default class PostProcessing
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        console.log(this.experience)
        this.sizes = this.experience.sizes
        this.ressources = this.experience.ressources

        // Wait for resources
        this.setSobelEffect()
    }

    setSobelEffect()
    {
        this.renderTarget = new THREE.WebGLRenderTarget(
            800,
            600,
            {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                encoding: THREE.sRGBEncoding,
            }
        )
        this.effectComposer = new EffectComposer(this.renderer.instance, this.renderTarget)
        console.log(this.effectComposer)
        this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        console.log(this.camera)
        this.renderPass = new RenderPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(this.renderPass)

        const effectSobel = new ShaderPass( SobelOutline )
        effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * Math.min(window.devicePixelRatio, 2)
        effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * Math.min(window.devicePixelRatio, 2)


        this.effectComposer.addPass(effectSobel)

        console.log(this.effectComposer)
    }

    resize()
    {
        // Update composer
        this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
    }

    update()
    {
        this.effectComposer.render()
    }

}
