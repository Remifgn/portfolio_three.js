import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap"

import Experience from "./Experience"
import { Vector3 } from 'three'


export default class Camera{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Camera_position')
        }

        this.setInstance()
        this.setOrbitControl()
        this.setCamAngle()
        this.setTransitions()

    }

    setInstance()
    {
        this.fov = 35
        this.instance = new THREE.PerspectiveCamera(
            this.fov,
            this.sizes.width / this.sizes.height,
            0.1,
            1000
        )

        this.instance.position.set(6, 4, 8)

        this.scene.add(this.instance)
    }

    setOrbitControl()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
        this.controls.rotateSpeed = 1.2
        this.controls.zoomSpeed = 0.8
        this.controls.target.z = -1
        this.controls.enableRotate = true
        this.controls.enableZoom = true
    }

    setTransitions()
    {
        this.transitions = {}
        this.transitions.interior = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: 2, ease: "power1.inOut",
            x: 1,
            y: -1.6,
            z: -1.5})
            gsap.to(this.controls.target, { duration: 2, ease: "power1.inOut",
            x: 1,
            y: 0.35,
            z: 0.2})

            // await this.sleep(1500)
            // this.controls.enableRotate = true
            this.controls.enableZoom = true
        }

        this.transitions.default = async (duration) =>
        {
            console.log('hello')
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: 2, ease: "power1.inOut",
            x: 2.276,
            y: 3.546,
            z: 8.8})
            gsap.to(this.controls.target, { duration: 2, ease: "power1.inOut",
            x: 1,
            y: 0.35,
            z: 0.2})

            // await this.sleep(1500)
            // this.controls.enableRotate = true
            this.controls.enableZoom = true
        }
    }

    setCamAngle()
    {

        this.camAngle = {}

        this.camAngle.unlocked = () =>
        {
            this.controls.enableZoom = true
            this.controls.enablePan = true
            this.controls.maxDistance = 1000
            this.controls.minDistance = 0
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = - Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
            this.cam = true
        }

        this.camAngle.space = () =>
        {
            this.instance.position.set(-349, -206, 455)
            this.instance.rotation.set(0.17, -0.2695, 0.0457)
            this.controls.target.set(-350, -205, 410)
            this.controls.enableZoom = true
            this.controls.enablePan = true
            this.controls.enableRotate = true
            this.controls.maxDistance = 90
            this.controls.minDistance = 0
            // this.controls.minAzimuthAngle = -1.14
            // this.controls.maxAzimuthAngle = -0.27
            // this.controls.minPolarAngle = 1.61
            // this.controls.maxPolarAngle = 2.22
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
        }

        this.camAngle.default = () =>
        {
            this.controls.enableRotate = true
            this.controls.enableZoom = true
            this.controls.minDistance = 2
            this.controls.maxDistance = 14
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = Math.PI *0.2
            this.controls.maxPolarAngle = 1.5
        }

        this.camAngle.interior = () =>
        {
            this.controls.enableRotate = true
            this.controls.enableZoom = true
            this.controls.minDistance = 1.25
            this.controls.maxDistance = 3

            this.controls.minAzimuthAngle = -2
            this.controls.maxAzimuthAngle = -1.11
            this.controls.minPolarAngle = 0.92
            this.controls.maxPolarAngle = 1.20
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
        console.log(this.instance.rotation.x)
        console.log(this.instance.rotation.y)
        console.log(this.instance.rotation.z)
        console.log('fov:' + this.fov)
        console.log('position x:' + this.instance.position.x)
        console.log('position y:' + this.instance.position.y)
        console.log('position z:' + this.instance.position.z)
        console.log('polar angle: ' + this.controls.getPolarAngle())
        console.log('polar azimute: ' + this.controls.getAzimuthalAngle())
        console.log('distance :' +  this.controls.getDistance())

    }

    sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    cameraMovement()
    {
        this.Movement = {}
        this.cameraPosition = new THREE.Vector3(1, -1.6, -1.5)
        this.controlTraget = new THREE.Vector3(1, 0.35, 0.2)

        this.Movement.ajust = () =>{

            gsap.to(this.instance.position, { duration: 0, ease: "power1.inOut",
            x: this.cameraPosition.x,
            y: this.cameraPosition.y,
            z: this.cameraPosition.z})
            gsap.to(this.controls.target, { duration: 0, ease: "power1.inOut",
            x: this.controlTraget.x,
            y: this.controlTraget.y,
            z: this.controlTraget.z})
        }
        if (this.debugFolder)
        {
            this.debugFolder
            .add(this.cameraPosition, 'x')
            .name('camera x')
            .min(-10)
            .max(10)
            .step(0.001)
            .onChange(this.Movement.ajust)
            this.debugFolder
                .add(this.cameraPosition, 'y')
                .name('camera y')
                .min(-10)
                .max(10)
                .step(0.001)
                .onChange(this.Movement.ajust)
            this.debugFolder
                .add(this.cameraPosition, 'z')
                .name('camera z')
                .min(-10)
                .max(10)
                .step(0.001)
                .onChange(this.Movement.ajust)
            this.debugFolder
                .add(this.controlTraget, 'x')
                .name('control x')
                .min(-10)
                .max(10)
                .step(0.001)
                .onChange(this.Movement.ajust)
            this.debugFolder
                .add(this.controlTraget, 'y')
                .name('control y')
                .min(-10)
                .max(10)
                .step(0.001)
                .onChange(this.Movement.ajust)
            this.debugFolder
                .add(this.controlTraget, 'z')
                .name('control z')
                .min(-10)
                .max(10)
                .step(0.001)
                .onChange(this.Movement.ajust)
        }
        else{
            this.Movement.ajust()
        }


    }

}