
import * as THREE from 'three'
import Experience from '../Experience'

import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'
import { ToonShader1, ToonShader2, ToonShaderHatching, ToonShaderDotted } from 'three/examples/jsm/shaders/ToonShader.js'

export default class Smoke{
    constructor()
    {
        this.experience = new Experience()
        console.log(this.experience.world)
        this.environment = this.experience.world.environment
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.clock = this.experience.time

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Smoke')
        }

        this.init()
        this.setupGui()
    }

    init()
    {
        this.time = 0
        this.ambientLight = this.environment.ambientLight
        this.light = this.environment.sunLight
        this.reflectionCube = this.environment.environmentMap
        this.generateMaterials()
        this.current_material = 'toon1'

        this.resolution = 28

        this.effect = new MarchingCubes( this.resolution, this.materials[ this.current_material ], true, true, 5000 )
        this.effect.position.set( 0, 0, 0 )
        this.effect.scale.set( 1, 5, 1 )

        this.effect.enableUvs = false
        this.effect.enableColors = false

        this.scene.add( this.effect )
    }

    generateMaterials() {

        // toons

        const toonMaterial1 = this.createShaderMaterial( ToonShader1, this.light, this.ambientLight )
        const toonMaterial2 = this.createShaderMaterial( ToonShader2, this.light, this.ambientLight )
        const hatchingMaterial = this.createShaderMaterial( ToonShaderHatching, this.light, this.ambientLight )
        const dottedMaterial = this.createShaderMaterial( ToonShaderDotted, this.light, this.ambientLight )

        this.materials = {
            'shiny': new THREE.MeshStandardMaterial( { color: 0x550000, envMap: this.reflectionCube, roughness: 0.1, metalness: 1.0 } ),
            'chrome': new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: this.reflectionCube } ),
            'liquid': new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: this.reflectionCube, refractionRatio: 0.85 } ),
            'matte': new THREE.MeshPhongMaterial( { specular: 0x111111, shininess: 1 } ),
            'flat': new THREE.MeshLambertMaterial( { /*TODO flatShading: true */ } ),
            'colors': new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 2, vertexColors: true } ),
            'multiColors': new THREE.MeshPhongMaterial( { shininess: 2, vertexColors: true } ),
            'plastic': new THREE.MeshPhongMaterial( { specular: 0x888888, shininess: 250 } ),
            'toon1': toonMaterial1,
            'toon2': toonMaterial2,
            'hatching': hatchingMaterial,
            'dotted': dottedMaterial
        }
        console.log(this.materials)

    }

    createShaderMaterial( shader, light, ambientLight ) {

        const u = THREE.UniformsUtils.clone( shader.uniforms )

        const vs = shader.vertexShader
        const fs = shader.fragmentShader

        const material = new THREE.ShaderMaterial( { uniforms: u, vertexShader: vs, fragmentShader: fs } )

        material.uniforms[ 'uDirLightPos' ].value = light.position
        material.uniforms[ 'uDirLightColor' ].value = light.color

        material.uniforms[ 'uAmbientLightColor' ].value = ambientLight.color

        return material

    }

    setupGui() {

        console.log(this)
        const createHandler = ( id ) =>{

            return function () {
                console.log(this)
                this.current_material = id
                this.effect.material = this.materials[ id ]
                this.effect.enableUvs = ( this.current_material === 'textured' ) ? true : false
                this.effect.enableColors = ( this.current_material === 'colors' || this.current_material === 'multiColors' ) ? true : false

            }

        }

        this.effectController = {

            material: 'shiny',

            speed: 1,
            numBlobs: 10,
            resolution: 28,
            isolation: 80,

            floor: true,
            wallx: false,
            wallz: false,

            dummy: function () {}

        }


        for ( const m in this.materials ) {

            this.effectController[ m ] = createHandler( m )
            this.debugFolder.add( this.effectController, m ).name( m )
        }

        // simulation

        this.debugFolder.add( this.effectController, 'speed', 0.001, 1, 0.0001 )
        this.debugFolder.add( this.effectController, 'numBlobs', 1, 50, 1 )
        this.debugFolder.add( this.effectController, 'resolution', 14, 100, 1 )
        this.debugFolder.add( this.effectController, 'isolation', 10, 300, 1 )

        this.debugFolder.add( this.effectController, 'floor' )
        this.debugFolder.add( this.effectController, 'wallx' )
        this.debugFolder.add( this.effectController, 'wallz' )
    }

    updateCubes( object, time, numblobs, floor, wallx, wallz ) {

        object.reset()

        // fill the field with some metaballs

        const rainbow = [
            new THREE.Color( 0xff0000 ),
            new THREE.Color( 0xff7f00 ),
            new THREE.Color( 0xffff00 ),
            new THREE.Color( 0x00ff00 ),
            new THREE.Color( 0x0000ff ),
            new THREE.Color( 0x4b0082 ),
            new THREE.Color( 0x9400d3 )
        ]
        const subtract = 12
        const strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 )
        const damping = 1

        for ( let i = 0; i < numblobs; i ++ ) {

            // const ballx = (Math.sin( i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i )  ) ) * 0.27 + 0.5) * damping
            // const bally = (Math.abs( Math.cos( (i + 1.12 * time * Math.cos( 1.22 + 0.1424 * i )) ) ) * 0.77) * damping //dip into the floor
            // const ballz = (Math.cos( (i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) )) ) * 0.27 + 0.5)* damping

            const ballx = (Math.sin( i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i )  ) ) * 0.27 + 0.5) * damping
            const bally = (Math.abs( Math.cos( (i + 1.12 * time * Math.cos( 1.22 + 0.1424 * i )) ) ) * 0.77) * damping //dip into the floor
            const ballz = (Math.cos( (i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) )) ) * 0.27 + 0.5)* damping


            if ( this.current_material === 'multiColors' ) {

                object.addBall( ballx, bally, ballz, strength, subtract, rainbow[ i % 7 ] )

            } else {

                object.addBall( ballx, bally, ballz, strength, subtract )

            }

        }

        if ( floor ) object.addPlaneY( 10, 12 )
        if ( wallz ) object.addPlaneZ( 10, 12 )
        if ( wallx ) object.addPlaneX( 10, 12 )

        object.update()

    }

    animate()
    {
        const delta = this.clock.delta * 0.001
        this.time += delta * this.effectController.speed * 0.5

        // marching cubes

        if ( this.effectController.resolution !== this.resolution ) {

            this.resolution = this.effectController.resolution
            this.effect.init( Math.floor( this.resolution ) )

        }

        if ( this.effectController.isolation !== this.effect.isolation ) {

            this.effect.isolation = this.effectController.isolation

        }

        this.updateCubes( this.effect, this.time, this.effectController.numBlobs, this.effectController.floor, this.effectController.wallx, this.effectController.wallz )
    }
}