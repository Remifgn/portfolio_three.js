import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap"

import Experience from "./Experience"


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

    }

    setInstance()
    {
        this.fov = 35
        this.instance = new THREE.PerspectiveCamera(
            this.fov,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )

        this.instance.position.set(6, 4, 8)

        this.scene.add(this.instance)
    }

    setOrbitControl()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = true
        this.controls.rotateSpeed = 1.2
        this.controls.zoomSpeed = 0.8
        this.controls.target.z = -1
        this.controls.enableRotate = true
        this.controls.enableZoom = true
    }

    setCamAngle()
    {
        this.camAngle = {}

        this.camAngle.unlocked = () =>
        {
            this.controls.maxDistance = 30
            this.controls.minDistance = 0
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
            this.cam = true
        }

        this.camAngle.default = () =>
        {
            this.controls.minDistance = 4
            this.controls.maxDistance = 14
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = Math.PI *0.2
            this.controls.maxPolarAngle = 1.5
            this.cam = false
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
        console.log(this.fov)
        console.log(this.instance.position)
        console.log(this.controls.getPolarAngle())
        console.log(this.controls.getDistance())

    }

    cameraMovement(cameraPosition)
    {
        gsap.to( this.instance.position, {
			duration: 2,
			x: cameraPosition.x,
			y: cameraPosition.y,
			z: cameraPosition.z,
			onUpdate: function() {
				//this.instance.lookAt( mesh.position );
			}
		} );
    }

}