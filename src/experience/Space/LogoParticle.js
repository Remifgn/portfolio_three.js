import gsap from "gsap"
import * as THREE from 'three'
import Experience from '../Experience.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import logosVertexShader from '../../shaders/logos/vertex.glsl'
import logosFragmentShader from '../../shaders/logos/fragment.glsl'

export default class LogoParticle
{
    constructor(logoName, position)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.meshIdx = 0


        // Debug

        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('LogoParticle' + logoName)
        }
        this.ressource = this.ressources.items.logosModel

        this.instance = {}
        this.morphed = true
        this.findMesh(logoName)
        this.setMeshMat()

        this.setupAnimation()
        this.setParticleSystem(position)

    }

    setMeshMat()
    {
        this.meshMat = new THREE.MeshBasicMaterial(0xffffff)
        this.meshMat.wireframe = true
    }

    createSpherePositions(pointCount)
    {
        const sphereMesh = new THREE.Mesh(
            new THREE.SphereGeometry(800, 32, 32),
            this.meshMat
        )
        const spherePositions = new Float32Array (pointCount * 3)
        const colors = new Float32Array (pointCount* 3)
        this.scales = new Float32Array(pointCount * 1)

        const sampler = new MeshSurfaceSampler(sphereMesh)
            .setWeightAttribute( null )
            .build()

        const tempPosition = new THREE.Vector3();
        for (let i = 0; i < spherePositions.length; i++) {
            const i3 = i*3
            sampler.sample(tempPosition)
            spherePositions[i3] = tempPosition.x
            spherePositions[i3 + 1] = tempPosition.y
            spherePositions[i3 + 2] = tempPosition.z
        }
        return spherePositions

    }

    findMesh(logoName)
    {
        // console.log(this.ressource)
        // console.log(logoName)
        // console.log(this.ressource.scene.children.find(child => child.name === logoName))
        this.instance.meshList = this.ressource.scene.children.find(child => child.name === logoName)
        //this.instance.meshList.scale.set(50, 50, 50)
        //this.scene.add(this.instance.meshList)
    }

    setParticleSystem(position)
    {
        // Options
        this.particleSystemParams = {}

        this.particleSystemParams.count = 10000
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
                uRotationSpeed:{value: this.particleSystemParams.rotationSpeed},
                uMix: { value: 0 },
                uStartTime: { value: 0 },
                uTransitionTime: { value: this.animationParams.transitionTime },
                uOrigin: {value: position}
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
        let childrenNumber =  1
        let meshLogo = []
        meshLogo[0] = this.instance.meshList

        if(this.instance.meshList.children.length)
        {
            childrenNumber =  this.instance.meshList.children.length
            meshLogo = this.instance.meshList.children
        }

        this.instance.children = []
        for(const materialMesh of meshLogo)
        {

            const child = {}
            // Particle Geometry
            const particles = new THREE.BufferGeometry()
            const points = new Float32Array ((this.particleSystemParams.count / childrenNumber) * 3)
            const colors = new Float32Array ((this.particleSystemParams.count / childrenNumber) * 3)
            this.scales = new Float32Array(this.particleSystemParams.count / childrenNumber * 1)

            const sampler = new MeshSurfaceSampler(materialMesh)
                .setWeightAttribute( null )
                .build()

            const tempPosition = new THREE.Vector3();
            for (let i = 0; i < points.length; i++)
            {
                const i3 = i*3
                sampler.sample(tempPosition)
                points[i3] = tempPosition.x
                points[i3 + 1] = tempPosition.y
                points[i3 + 2] = tempPosition.z

                colors[i3 ] = materialMesh.material.color.r
                colors[i3 + 1] = materialMesh.material.color.g
                colors[i3 + 2] = materialMesh.material.color.b

                this.scales[i] = Math.random()

            }
            child.logoPositions = points
            // console.log(child.logoPositions)

            particles.setAttribute('aScale', new THREE.BufferAttribute(this.scales, 1))
            particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

            child.bufferGeometry = particles
            child.spherePositions = this.createSpherePositions(points.length / 3)
            child.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(child.spherePositions, 3))
            child.bufferGeometry.setAttribute('aNewPosition', new THREE.BufferAttribute(child.spherePositions, 3))


            child.particlePoints = new THREE.Points(child.bufferGeometry, this.materialShader)
            // fix particle disappear on camera angle
            child.particlePoints.frustumCulled = false

            this.scene.add(child.particlePoints)
            // console.log(child.particlePoints)
            this.instance.children.push(child)

        }


    }

    triggerMorph()
    {
        this.animationParams.startTime = this.time.elapsedTime
        // console.log(this.instance.children)
        for(let child of this.instance.children)
        {
            child.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(child.spherePositions, 3))
            child.bufferGeometry.setAttribute('aNewPosition', new THREE.BufferAttribute(child.logoPositions, 3))
            // console.log(child.particlePoints)
        }

        this.morphed = true
    }

    setupAnimation()
    {
        this.animationParams = {
            defaultAnimationSpeed : 1,
            morphAnimationSpeed : 18,
            startTime: 10000000000000000000000000000000000000000000,
            //fix me !
            transitionTime : 2000,
            rotation: -45,
            rotationSpeed: 1,
        }

        this.animationParams.normalSpeed = (this.animationParams.defaultAnimationSpeed / 100)
        this.animationParams.fullSpeed = (this.animationParams.morphAnimationSpeed / 100)

        this.animationParams.speed = this.animationParams.normalSpeed
        // this.animationParams.color = this.particleSystemParams.color
    }


    update ()
    {
        if(this.morphed)
        {
            this.materialShader.uniforms.uRotationSpeed.value = 0.0
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
            // console.log(this.materialShader.uniforms.uMix.value)
        }
        else
        {
            this.morphed = false
        }
    }

    destroy()
    {

        this.animationParams.startTime = this.time.elapsedTime
        // console.log(this.instance.children)
        for(let child of this.instance.children)
        {
            child.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(child.logoPositions, 3))
            child.bufferGeometry.setAttribute('aNewPosition', new THREE.BufferAttribute(child.spherePositions, 3))
            // console.log(child.particlePoints)
        }

        this.morphed = true
        setTimeout(() => {
            for(let child of this.instance.children)
            {
                this.scene.remove(child.particlePoints)
                child.bufferGeometry.dispose()
            }
            this.materialShader.dispose()
        }, 1000);


    }
}