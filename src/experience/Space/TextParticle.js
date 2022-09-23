import gsap from "gsap"
import * as THREE from 'three'
import Experience from '../Experience.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import logosVertexShader from '../../shaders/logos/vertex.glsl'
import logosFragmentShader from '../../shaders/logos/fragment.glsl'

export default class TextParticle{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.font = this.ressources.items.helvetica
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.meshIdx = 0


        // Debug

        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('SpaceEnvironment')
        }
        this.meshesArray = []
        this.createTextMesh([ "Why does it", "disappear ?? "])
        this.setupAnimation()
        this.setParticleSystem(this.meshesArray)

    }

    createTextMesh(textArray)
    {
        for (var text of textArray)
        {
            const meshEntry = {}

            meshEntry.geometry = new TextGeometry(
                                text,
                                {
                                    font: this.font,
                                    size: 5,
                                    height: 2,
                                    curveSegments: 5,
                                    bevelEnabled: true,
                                    bevelThickness: 0.03,
                                    bevelSize: 0.02,
                                    bevelSegments: 4
                                }
                            )
            this.textMat = new THREE.MeshBasicMaterial(0xffffff)
            this.textMat.wireframe = true


            meshEntry.geometry.center()
            meshEntry.mesh = new THREE.Mesh(
                meshEntry.geometry,
                this.textMat
            )
            this.meshesArray.push(meshEntry)
        }


    }

    setParticleSystem(meshesArray)
    {
        // Options
        this.particleSystemParams = {}

        this.particleSystemParams.count = 60000
        this.particleSystemParams.particleSize = 300
        this.particleSystemParams.defaultAnimationSpeed = 1
        this.particleSystemParams.morphAnimationSpeed = 18
        this.particleSystemParams.color = 0xffffff

        /**
         * Material
         */
        this.materialShader = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: logosVertexShader,
            fragmentShader: logosFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uSize: {value: this.particleSystemParams.particleSize * this.sizes.pixelRatio},
                uTime: { value: 0 },
                uMix: { value: 0 },
                uStartTime: { value: 0 },
                uTransitionTime: { value: this.animationVars.transitionTime },
                uOrigin: {value: new THREE.Vector3(-371, -194, 400)}
            }
        })

        if(this.debug.active)
        {
            this.debugFolder
                .add( this.materialShader.uniforms.uOrigin.value, 'x')
                .name('x')
                .min(- 450)
                .max(-100)
                .step(0.001)

            this.debugFolder
                .add(this.materialShader.uniforms.uOrigin.value, 'y')
                .name('y')
                .min(- 300)
                .max(300)
                .step(0.001)

            this.debugFolder
                .add(this.materialShader.uniforms.uOrigin.value, 'z')
                .name('z')
                .min(400)
                .max(500)
                .step(0.001)
        }
        console.log(meshesArray)
        for (const meshEntry of meshesArray)
        {
            console.log(meshEntry)
            // Particle Geometry
            this.particles = new THREE.BufferGeometry()
            meshEntry.points = new Float32Array (this.particleSystemParams.count * 3)
            const colors = new Float32Array (this.particleSystemParams.count * 3)
            this.scales = new Float32Array(this.particleSystemParams.count * 1)

            const sampler = new MeshSurfaceSampler( meshEntry.mesh)
                .setWeightAttribute( null )
                .build()

            const tempPosition = new THREE.Vector3();
            for (let i = 0; i < meshEntry.points.length; i++) {
                const i3 = i*3
                sampler.sample(tempPosition)
                meshEntry.points[i3] = tempPosition.x
                meshEntry.points[i3 + 1] = tempPosition.y
                meshEntry.points[i3 + 2] = tempPosition.z

                this.scales[i] = Math.random()

            }
        }

        this.particles.setAttribute('aScale', new THREE.BufferAttribute(this.scales, 1))



        this.particlesPoints = new THREE.Points(this.particles, this.materialShader)
        this.scene.add(this.particlesPoints)
        console.log(this.particlesPoints)

    }

    triggerMorph()
    {
        this.meshIdx++
        this.particles.setAttribute('position', new THREE.BufferAttribute(this.meshesArray[(this.meshIdx % this.meshesArray.length + this.meshesArray.length) % this.meshesArray.length].points, 3))
        this.particles.setAttribute(`aNewPosition`, new THREE.BufferAttribute(this.meshesArray[((this.meshIdx +1) % this.meshesArray.length + this.meshesArray.length) % this.meshesArray.length].points, 3))
        this.animationVars.startTime = this.time.elapsedTime

    }

    setupAnimation()
    {
        this.animationVars = {
            defaultAnimationSpeed : 1,
            morphAnimationSpeed : 18,
            startTime: 0,
            transitionTime : 2000,
            rotation: -45,
        }

        this.animationVars.normalSpeed = (this.animationVars.defaultAnimationSpeed / 100)
        this.animationVars.fullSpeed = (this.animationVars.morphAnimationSpeed / 100)

        this.animationVars.speed = this.animationVars.normalSpeed
        // this.animationVars.color = this.particleSystemParams.color
    }

    animate()
    {

        this.particles.rotation.y += this.animationVars.speed

        this.particleSystem.material.color = new THREE.Color( animationVars.color )
    }

    morphTo(newParticles, color = '#FFFFFF')
    {

        gsap.to(animationVars, .1, {
            ease: Power4.easeIn,
            speed: fullSpeed,
            onComplete: this.slowDown
        })

        gsap.to(animationVars, 2, {
            ease: Linear.easeNone,
            color: color
        })


        // particleSystem.material.color.setHex(color)


        gsap.to(animationVars, 2, {
            ease: Elastic.easeOut.config( 0.1, .3),
            rotation: animationVars.rotation == 45 ? -45 : 45,
        })
    }
    slowDown ()
    {
        gsap.to(this.animationVars, 0.3, {ease:
        Power2.easeOut, speed: normalSpeed, delay: 0.2})
    }

    update ()
    {
        this.materialShader.uniforms.uTime.value = this.time.elapsedTime * 0.0001

        if( this.animationVars.startTime + this.animationVars.transitionTime > this.time.elapsedTime)
        {
            this.materialShader.uniforms.uMix.value = (this.time.elapsedTime - this.animationVars.startTime) / this.animationVars.transitionTime
        }
    }
}