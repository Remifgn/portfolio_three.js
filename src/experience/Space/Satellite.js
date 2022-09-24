import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Satellite{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources= this.experience.ressources
        this.time = this.experience.time
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('satellite')
        }

        //Setup
        this.ressource = this.ressources.items.satelliteModel


        this.setModel()
        //this.setMaterial()
        this.update()
    }

    setModel()
    {
        console.log(this.ressource)
        this.ressource.scene.position.set(-350, -205, 410)
        this.ressource.scene.rotation.set(-1.122, 0, -0.813)
        this.model = this.ressource.scene
        this.model.rotation.reorder('XZY')




        if(this.debugFolder)
        {
            this.arrowHelper = () =>
            {
                this.scene.remove(this.helper)
                this.helper = new THREE.ArrowHelper( this.rotAnimAngle, this.ressource.scene.position, this.rotAnimAngle.length() * 5, 0xff0000 )
                this.scene.add(this.helper)
            }
            this.debugObject = {}
            this.debugObject.angle = 0
            this.debugFolder
                .add(this.ressource.scene.rotation, 'x')
                .name('Satellite Rotx')
                .min(- Math.PI)
                .max(Math.PI)
                .step(0.001)
            this.debugFolder
                .add(this.ressource.scene.rotation, 'y')
                .name('Satellite Roty')
                .min(- Math.PI)
                .max(Math.PI)
                .step(0.001)
            this.debugFolder
                .add(this.ressource.scene.rotation, 'z')
                .name('Satellite Rotz')
                .min(- Math.PI)
                .max(Math.PI)
                .step(0.001)
        }
        //this.model.rotation.z = Math.Pi * 0.5

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.name = 'satellite'
                this.experience.objectToTest.push(child)
            }
        })
        console.log(this.experience.objectToTest)


        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }


    handleRotation(model, axis, angle)
	{
        var rotateQuaternion = new THREE.Quaternion()
        rotateQuaternion.setFromAxisAngle(axis, angle)
		var curQuaternion = model.quaternion
        // console.log(this.curQuaternion)

		curQuaternion.multiplyQuaternions(rotateQuaternion, curQuaternion);
		curQuaternion.normalize();
		model.setRotationFromQuaternion(curQuaternion);
    };

    setMaterial()
    {
        this.bakedMaterial = new THREE.MeshBasicMaterial({
            wireframe: true,
            side: THREE.DoubleSide
        })
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                //child.material = this.bakedMaterial
            }
        })

    }

    destroy()
    {
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
        this.scene.remove(this.model)

    }

    update()
    {
        this.model.rotation.y =  (this.time.elapsedTime * 0.0001) % Math.PI*2
    }


}