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

        this.setInstance()
        this.setOrbitControl()

    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35,
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
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
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