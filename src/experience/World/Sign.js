import * as THREE from 'three'
import Experience from "../Experience.js"
import Interior from './Interior.js'


export default class sRGBEncoding{
    constructor(cameraPosition)
    {
        this.cameraPosition = cameraPosition
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.world = this.experience.world
        this.camControls = this.experience.camcontrols

        //Debug
        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('signs')
        }

        this.setMesh()
    }

    setMesh()
    {
        this.sign = {}
        this.sign.position = {}
        this.sign.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 1),
            new THREE.MeshBasicMaterial
        )
        if(this.debug.active)
        {
        }

        this.sign.position.x = 1
        this.sign.position.y = 1
        this.sign.position.z = 1

        this.sign.plane.position.set(1, 1, 1)


        this.sign.scale

        this.scene.add(this.sign.plane)
    }

    actionOnClick()
    {
        this.world.woodCabin.destroy()
        this.world.interior = new Interior()
        this.camControls.setInteriorCam()
        this.camera.cameraMovement()
    }

}