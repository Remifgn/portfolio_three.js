import * as THREE from 'three'
import Experience from "../Experience.js"
import Interior from './Interior.js'


export default class Sign{
    constructor(params)
    {
        this.cameraPosition = params.cameraPosition
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.world = this.experience.world
        this.camControls = this.experience.camcontrols

        //Debug
        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder(params.name)
        }

        this.setMesh(params.name, params.position, params.rotation)
    }

    setMesh(name, signPosition, signRotation)
    {
        this.sign = {}
        this.sign.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 1),
            new THREE.MeshBasicMaterial
        )
        this.sign.plane.name = name
        if(this.debug.active)
        {
        }

        this.sign.plane.position.set(signPosition.x, signPosition.y, signPosition.z)
        this.sign.plane.rotation.set(signRotation.x, signRotation.y, signRotation.z)

        this.sign.scale

        this.scene.add(this.sign.plane)
        this.experience.objectToTest.push(this.sign.plane)

        if (this.debug.active) {


            this.debugFolder
                .add(this.sign.plane.position, 'x')
                .min(-10)
                .max(10)
                .step(0.001)
            this.debugFolder
                .add(this.sign.plane.position, 'y')
                .min(-10)
                .max(10)
                .step(0.001)
            this.debugFolder
                .add(this.sign.plane.position, 'z')
                .min(-10)
                .max(10)
                .step(0.001)
            this.debugFolder
                .add(this.sign.plane.rotation, 'x')
                .name('x rot')
                .min(0)
                .max(Math.PI * 2)
                .step(0.001)
            this.debugFolder
                .add(this.sign.plane.rotation, 'y')
                .name('y rot')
                .min(0)
                .max(Math.PI * 2)
                .step(0.001)
            this.debugFolder
                .add(this.sign.plane.rotation, 'z')
                .name('z rot')
                .min(0)
                .max(Math.PI * 2)
                .step(0.001)
        }

    }

    actionOnClick()
    {
        this.world.woodCabin.destroy()
        this.world.interior = new Interior()
        this.camControls.setInteriorCam()
        this.camera.cameraMovement()
    }

}