import * as THREE from 'three'
import Experience from "../Experience.js"


export default class sRGBEncoding{
    constructor(cameraPosition)
    {
        this.cameraPosition = cameraPosition
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

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
        this.camera.cameraMovement(this.cameraPosition)
    }

}