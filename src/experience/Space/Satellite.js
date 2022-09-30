import * as THREE from 'three'
import Experience from "../Experience.js"
import gsap from "gsap"
import TerminalTypeWriter from './TerminalTypeWritter.js'

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
        this.sizes = this.experience.sizes
        this.raycaster = new THREE.Raycaster()
        this.checkboxState = false
        this.firstTerminal = true

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

        this.setHtmlTerminal()
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

    setHtmlTerminal()
    {
        this.terminal = new TerminalTypeWriter()
        /**+
         * Points of interest
         */

        this.points = [
            {
                position: new THREE.Vector3(-339, -207, 410),
                element: document.querySelector('.terminal')
            },
            {
                position: this.model.position.clone(),
                element: document.querySelector('.dot')
            },
        ]
        const lineGeomerty = new THREE.BufferGeometry()
        const linePoints = new Float32Array(6)
        for (let i = 0 ; i < this.points.length; ++i)
        {
            let i3 = i*3
            linePoints[i3 ] = this.points[i].position.x
            linePoints[i3 + 1] = this.points[i].position.y
            linePoints[i3 + 2] = this.points[i].position.z
        }

        lineGeomerty.setAttribute('position', new THREE.BufferAttribute(linePoints, 3))


        this.line = new THREE.Line(lineGeomerty,
            new THREE.LineBasicMaterial({
                color: 0xffffff,
                linewidth: 100,
                linecap: 'round', //ignored by WebGLRenderer
                linejoin:  'round' //ignored by WebGLRenderer
            })
        )

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.points[0].position, 'x')
                .name('terminal x')
                .min(-400)
                .max(-300)
                .step(0.1)
            this.debugFolder
                .add(this.points[0].position, 'y')
                .name('terminal y')
                .min(-300)
                .max(-150)
                .step(0.1)
            this.debugFolder
                .add(this.points[0].position, 'z')
                .name('terminal z')
                .min(300)
                .max(500)
                .step(0.1)
        }
    }

    displayPoint()
    {
        this.points[1].element.classList.add('visible')
    }
    hidePoint()
    {
        this.points[1].element.classList.remove('visible')
    }
    displayTerminal()
    {
        this.checkboxState = ! this.checkboxState
        console.log("onchange")
        if(this.checkboxState)
        {
            this.scene.add(this.line)
            this.points[0].element.classList.add('visible')
        }
        else
        {
            this.hideTerminal()
        }
        if(this.firstTerminal)
        {
            this.terminal.typeNext()
            this.firstTerminal = false
        }

    }

    hideTerminal()
    {
        this.scene.remove(this.line)
        this.points[0].element.classList.remove('visible')
    }

    htmlOnMesh()
    {
        // Update points only when the scene is ready
        // Go through each point
        for(const point of this.points)
        {
            // Get 2D screen position
            const screenPosition = point.position.clone()
            screenPosition.project(this.camera.instance)

            const translateX = screenPosition.x * this.sizes.width * 0.5
            const translateY = - screenPosition.y * this.sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
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
        this.htmlOnMesh()
        if(this.orbiting)
        {
            this.pivot.rotation.y += Math.PI / (180 * 10)
        }
    }


}