

import * as THREE from 'three';

import Experience from '../Experience';


import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
//import Stats from 'three/addons/libs/stats.module.js';

export default class Flowers{
    constructor()
    {
        this.experience = new Experience()
        this.ressources = this.experience.ressources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.surface = this.experience.world.ground.modelGround

        this.time = this.experience.time

        this.ressource = this.ressources.items.flowerModel
        //Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Flowers')
        }

        this.debugObject = {
            count: 2000,
            distribution: 'random',
            surfaceColor: 0xFFF784,
            backgroundColor: 0xE39469,
        }

        this.sampleParams = {}
        console.log(this.debugObject)
        this.setModel()
    }

    scaleCurve(t)
    {
        const easeOutCubic = function ( t ) {

            return ( -- t ) * t * t + 1

        }

        // Scaling curve causes particles to grow quickly, ease gradually into full scale, then
        // disappear quickly. More of the particle's lifetime is spent around full scale.
        return Math.abs( easeOutCubic( ( t > 0.5 ? 1 - t : t ) * 2 ) )


    }

    setModel()
    {

        let stemGeometry, blossomGeometry;
        let stemMaterial, blossomMaterial;

        this.sampleParams.count = this.debugObject.count
        this.sampleParams.ages = new Float32Array( this.sampleParams.count )
        this.sampleParams.scales = new Float32Array( this.sampleParams.count )
        this.sampleParams.dummy = new THREE.Object3D()
        // }

        this.modelParams = {
            _position: new THREE.Vector3(),
            _normal: new THREE.Vector3(),
            _scale: new THREE.Vector3(),
        }

        console.log(this.ressource)
        this._stemMesh = this.ressource.scene.getObjectByName( 'stem' );
        this._blossomMesh = this.ressource.scene.getObjectByName( 'blossom' );

        stemGeometry = this._stemMesh.geometry.clone();
        blossomGeometry = this._blossomMesh.geometry.clone();

        const defaultTransform = new THREE.Matrix4()
            .makeRotationX(Math.PI * 0.5)
            .multiply( new THREE.Matrix4().makeScale( 0.5, 0.5, 0.5 ) );

        stemGeometry.applyMatrix4( defaultTransform );
        blossomGeometry.applyMatrix4( defaultTransform );

        stemMaterial = this._stemMesh.material;
        blossomMaterial = this._blossomMesh.material;

        this.stemMesh = new THREE.InstancedMesh( stemGeometry, stemMaterial, this.sampleParams.count );
        this.blossomMesh = new THREE.InstancedMesh( blossomGeometry, blossomMaterial, this.sampleParams.count );

        // Assign random colors to the blossoms.
        const color = new THREE.Color();
        const blossomPalette = [ 0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405 ];

        for ( let i = 0; i < this.sampleParams.count; i ++ ) {

            color.setHex( blossomPalette[ Math.floor( Math.random() * blossomPalette.length ) ] );
            this.blossomMesh.setColorAt( i, color );

        }

        // Instance matrices will be updated every frame.
        this.stemMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
        this.blossomMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
        this.sample()
        this.init()


    }

    init()
    {
        this.scene.add( this.stemMesh );
        this.scene.add( this.blossomMesh );

        this.changeCount = () =>
        {
            this.stemMesh.count = this.debugObject.count;
            this.blossomMesh.count = this.debugObject.count;
        }

        if(this.debug.active)
        {
            this.debugFolder
                .add( this.debugObject, 'count', 0, 2000 )
                .onChange( this.changeCount)

            // gui.addColor( api, 'backgroundColor' ).onChange( function () {

            // 	scene.background.setHex( api.backgroundColor );

            // } );

            // gui.addColor( api, 'surfaceColor' ).onChange( function () {

            // 	surfaceMaterial.color.setHex( api.surfaceColor );

            // } );

            this.debugFolder
                .add( this.debugObject, 'distribution' )
                .options( [ 'random', 'weighted' ] )
                .onChange( this.resample );
            this.debugFolder
                .add( this.debugObject, 'resample' );
        }
    }

    sample() {
        console.log(this.surface)
        this.resample = () => {
            const vertexCount = this.surface.geometry.getAttribute( 'position' ).count;

            //console.log( 'Sampling ' + this.sampleParams.count + ' points from a surface with ' + vertexCount + ' vertices...' );

            //
            this.scaledGeometry = this.surface.geometry.clone()
            this.scaledGeometry.scale(0.2, 0.2, 0.2)
            this.scaledSurface = this.surface.clone()
            this.scaledSurface.geometry = this.scaledGeometry
            console.time( '.build()' );
            this.sampler = new MeshSurfaceSampler( this.scaledSurface )
                .setWeightAttribute( this.debugObject.distribution === 'weighted' ? 'uv' : null )
                .build();

            console.timeEnd( '.build()' );

            //

            console.time( '.sample()' );

            for ( let i = 0; i < this.sampleParams.count; i ++ ) {

                this.sampleParams.ages[ i ] = Math.random();
                this.sampleParams.scales[ i ] = this.scaleCurve( this.sampleParams.ages[ i ] );

                this.resampleParticle( i );

            }

            console.timeEnd( '.sample()' );

            this.stemMesh.instanceMatrix.needsUpdate = true;
            this.blossomMesh.instanceMatrix.needsUpdate = true;

        }
        this.debugObject.resample = this.resample(),
        this.resample()
    }

    resampleParticle( i ) {

        this.sampler.sample( this.modelParams._position, this.modelParams._normal );
        this.modelParams._normal.add( this.modelParams._position );

        this.sampleParams.dummy.position.copy( this.modelParams._position );
        this.sampleParams.dummy.scale.set( this.sampleParams.scales[ i ], this.sampleParams.scales[ i ], this.sampleParams.scales[ i ] );
        this.sampleParams.dummy.lookAt( this.modelParams._normal );
        this.sampleParams.dummy.updateMatrix();

        this.stemMesh.setMatrixAt( i, this.sampleParams.dummy.matrix );
        this.blossomMesh.setMatrixAt( i, this.sampleParams.dummy.matrix );

    }

    updateParticle( i ) {

        // Update lifecycle.

        this.sampleParams.ages[ i ] += 0.005;

        if ( this.sampleParams.ages[ i ] >= 1 ) {

            this.sampleParams.ages[ i ] = 0.001;
            this.sampleParams.scales[ i ] = this.scaleCurve( this.sampleParams.ages[ i ] );

            this.resampleParticle( i );

            return;

        }

        // Update scale.

        const prevScale = this.sampleParams.scales[ i ];
        this.sampleParams.scales[ i ] = this.scaleCurve( this.sampleParams.ages[ i ] );
        this.modelParams._scale.set( this.sampleParams.scales[ i ] / prevScale, this.sampleParams.scales[ i ] / prevScale, this.sampleParams.scales[ i ] / prevScale );

        // Update transform.

        this.stemMesh.getMatrixAt( i, this.sampleParams.dummy.matrix );
        this.sampleParams.dummy.matrix.scale( this.modelParams._scale );
        this.stemMesh.setMatrixAt( i, this.sampleParams.dummy.matrix );
        this.blossomMesh.setMatrixAt( i, this.sampleParams.dummy.matrix );

    }

    update()
    {
        if ( this.stemMesh && this.blossomMesh ) {

            const currentTime = this.time.current * 0.001;

            for ( let i = 0; i < this.sampleParams.count; i ++ ) {

                this.updateParticle( i );

            }

            this.stemMesh.instanceMatrix.needsUpdate = true;
            this.blossomMesh.instanceMatrix.needsUpdate = true;

        }
    }
}
