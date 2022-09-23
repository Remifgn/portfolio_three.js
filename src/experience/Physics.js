
import CANNON from 'cannon'
import * as THREE from 'three'

export default class Physics{
    constructor()
    {
        // Set up
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('physics')
            // this.debugFolder.open()
        }

        this.setWorld()
        this.setModels()
        this.setMaterials()
        this.setFloor()
        this.setCar()
    }

    setWorld()
    {
        this.world = new CANNON.World()
        this.world.gravity.set(0, 0, 0)
        this.world.allowSleep = true
        // this.world.gravity.set(0, 0, 0)
        // this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.defaultContactMaterial.friction = 0
        this.world.defaultContactMaterial.restitution = 0.2

        // Debug
        if(this.debug)
        {
            this.debugFolder.add(this.world.gravity, 'x').step(0.001).min(- 20).max(20).name('gravity')
            this.debugFolder.add(this.world.gravity, 'y').step(0.001).min(- 20).max(20).name('gravity')
            this.debugFolder.add(this.world.gravity, 'z').step(0.001).min(- 20).max(20).name('gravity')
        }
    }

    setModels()
    {
        this.models = {}
        this.models.container = new THREE.Object3D()
        this.models.container.visible = false
        this.models.materials = {}
        this.models.materials.static = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
        this.models.materials.dynamic = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        this.models.materials.dynamicSleeping = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })

        // Debug
        if(this.debug)
        {
            this.debugFolder.add(this.models.container, 'visible').name('modelsVisible')
        }
    }

    setSatellite()
    {

    }
}