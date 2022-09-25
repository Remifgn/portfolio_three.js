import * as THREE from 'three'
import Experience from "../Experience.js"
import gsap from "gsap"

export default class Satellite{
    constructor()
    {
        this.experience = new Experience()
        this.space = this.experience.space
        this.scene = this.experience.scene
        this.ressources= this.experience.ressources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.camera = this.experience.camera

        //Debug
        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('satellite')
        }

        //Setup
        this.ressource = this.ressources.items.satelliteModel


        this.setModel()
        this.setOrbitRotate()
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
        this.pivot = new THREE.Object3D()
        this.scene.add(this.pivot)




        if(this.debugFolder)
        {
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




        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    addToObjectToTest()
    {
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.name = 'satellite'
                this.experience.objectToTest.push(child)
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

    moveToOrbit()
    {

        gsap.to(this.ressource.scene.position, { duration: 10, ease: "power1.in",
            x: 0,
            y: -10,
            z: 50,
            onComplete:this.orbitRotate
        })
        gsap.to(this.camera.controls, { duration: 2, ease: "power1.inOut",
            maxDistance: 35
        })


    }

    setOrbitRotate()
    {

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.pivot.rotation, 'y')
                .name('orbit y rot')
                .min(- Math.PI)
                .max(Math.PI)
                .step(0.0001)
            this.debugFolder
                .add(this.pivot.rotation, 'x')
                .name('orbit x rot')
                .min(- Math.PI)
                .max(Math.PI)
                .step(0.0001)
            this.debugFolder
                .add(this.pivot.rotation, 'z')
                .name('orbit z rot')
                .min(- Math.PI)
                .max(Math.PI)
                .step(0.0001)

        }
        this.orbitRotate = () =>
        {
            this.scene.remove(this.model)
            // this.model.position.set(0, 0, 0)

            // this.model.position.x = 50
            this.pivot.add(this.model)
            this.camera.transitions.planet(2)
            this.orbiting = true

        }

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
        if(this.orbiting)
        {
            this.pivot.rotation.y += Math.PI / (180 * 10)
        }
        //
    }


}