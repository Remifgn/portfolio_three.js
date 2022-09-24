import gsap from "gsap"
import * as THREE from 'three'
import Experience from '../Experience.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import textVertexShader from '../../shaders/text/vertex.glsl'
import textFragmentShader from '../../shaders/text/fragment.glsl'

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
        this.setMeshMat()
        this.createSphereMesh(this.meshesArray)
        this.textContent = [ "Hi, Welcome..", "Looking for something ?", "lets explore !"]
        this.createTextMesh(this.textContent)
        this.setupAnimation()
        this.setParticleSystem(this.meshesArray)

    }
    setMeshMat()
    {
        this.meshMat = new THREE.MeshBasicMaterial(0xffffff)
        this.meshMat.wireframe = true
    }
    createSphereMesh(meshesArray)
    {
        const sphereMesh = new THREE.Mesh(
            new THREE.SphereGeometry(800, 32, 32),
            this.meshMat
        )
        const meshEntry = {}
        meshEntry.geometry = sphereMesh.geometry
        meshEntry.mesh = sphereMesh
        meshesArray.push(meshEntry)

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
                                    size: 3,
                                    height: 1,
                                    curveSegments: 5,
                                    bevelEnabled: true,
                                    bevelThickness: 0.03,
                                    bevelSize: 0.02,
                                    bevelSegments: 4
                                }
                            )



            meshEntry.geometry.center()
            meshEntry.mesh = new THREE.Mesh(
                meshEntry.geometry,
                this.meshMat
            )
            this.meshesArray.push(meshEntry)
        }


    }

    setParticleSystem(meshesArray)
    {
        // Options
        this.particleSystemParams = {}

        this.particleSystemParams.count = 6000
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
            vertexShader: textVertexShader,
            fragmentShader: textFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uSize: {value: this.particleSystemParams.particleSize * this.sizes.pixelRatio},
                uTime: { value: 0 },
                uAngle: {value: 0.368},
                uRotationSpeed:{value: this.particleSystemParams.rotationSpeed},
                uMix: { value: 0 },
                uStartTime: { value: 0 },
                uTransitionTime: { value: this.animationParams.transitionTime },
                uOrigin: {value: new THREE.Vector3(-349, -188, 400)}
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

            this.debugFolder
                .add(this.materialShader.uniforms.uAngle, 'value')
                .name('angle')
                .min(0)
                .max(Math.PI * 2)
                .step(0.001)
        }
        for (const meshEntry of meshesArray)
        {
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
        //this.particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        this.particles.setAttribute('position', new THREE.BufferAttribute(this.meshesArray[0].points, 3))
        this.particles.setAttribute('aNewPosition', new THREE.BufferAttribute(this.meshesArray[0].points, 3))


        this.particlesPoints = new THREE.Points(this.particles, this.materialShader)

        // fix particle disappear on camera angle
        this.particlesPoints.frustumCulled = false


        this.scene.add(this.particlesPoints)

    }

    triggerMorph()
    {

        console.log((this.meshIdx % this.meshesArray.length + this.meshesArray.length) % this.meshesArray.length)
        this.particles.setAttribute('position', new THREE.BufferAttribute(this.meshesArray[(this.meshIdx % this.meshesArray.length + this.meshesArray.length) % this.meshesArray.length].points, 3))
        this.particles.setAttribute(`aNewPosition`, new THREE.BufferAttribute(this.meshesArray[((this.meshIdx +1) % this.meshesArray.length + this.meshesArray.length) % this.meshesArray.length].points, 3))
        this.animationParams.startTime = this.time.elapsedTime
        this.meshIdx++
    }

    setupAnimation()
    {
        this.animationParams = {
            defaultAnimationSpeed : 1,
            morphAnimationSpeed : 18,
            startTime: 0,
            transitionTime : 2000,
            rotation: -45,
            rotationSpeed: 1,
        }

        this.animationParams.normalSpeed = (this.animationParams.defaultAnimationSpeed / 100)
        this.animationParams.fullSpeed = (this.animationParams.morphAnimationSpeed / 100)

        this.animationParams.speed = this.animationParams.normalSpeed
        // this.animationParams.color = this.particleSystemParams.color
    }

    animate()
    {

        this.particles.rotation.y += this.animationParams.speed

        this.particleSystem.material.color = new THREE.Color( animationParams.color )
    }

    morphTo(newParticles, color = '#FFFFFF')
    {

        gsap.to(animationParams, .1, {
            ease: Power4.easeIn,
            speed: fullSpeed,
            onComplete: this.slowDown
        })

        gsap.to(animationParams, 2, {
            ease: Linear.easeNone,
            color: color
        })


        // particleSystem.material.color.setHex(color)


        gsap.to(animationParams, 2, {
            ease: Elastic.easeOut.config( 0.1, .3),
            rotation: animationParams.rotation == 45 ? -45 : 45,
        })
    }
    slowDown ()
    {
        gsap.to(this.animationParams, 0.3, {ease:
        Power2.easeOut, speed: normalSpeed, delay: 0.2})
    }

    update ()
    {
        if(((this.meshIdx % this.meshesArray.length + this.meshesArray.length) % this.meshesArray.length) == 2)
        {
            this.materialShader.uniforms.uRotationSpeed.value = 0.01
        }
        else
        {
            this.materialShader.uniforms.uRotationSpeed.value = this.animationParams.rotationSpeed
        }
        this.materialShader.uniforms.uTime.value = this.time.elapsedTime * 0.001
        // console.log(Math.sin(this.materialShader.uniforms.uTime.value)+1)

        if( this.animationParams.startTime + this.animationParams.transitionTime + this.time.delta > this.time.elapsedTime)
        {
            this.materialShader.uniforms.uMix.value = (this.time.elapsedTime - this.animationParams.startTime) / this.animationParams.transitionTime
        }
    }
}