import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';


import EventEmitter from "./EventEmitter.js"


export default class Ressources extends EventEmitter
{
    constructor(sources)
    {
        super()


        // Options
        this.sources = sources
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        // Setup
        this.setLoader()
        // Loading
        this.startLoading()
    }

    setLoader()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

        this.loaders.ttfFontLoader = new TTFLoader()
        this.loaders.fontLoader = new FontLoader()



    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if (source.type === 'gltfModel' )
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            if (source.type === 'texture' )
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            if (source.type === 'cubeTexture' )
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            // if (source.type === 'ttfFont' )
            // {

            //     this.loaders.ttfFontLoader.load(
            //         source.path,
            //         ( file ) =>
            //         {
            //             const font = new Font( file );
            //             this.sourceLoaded(source, font)
            //         }
            //     )
            // }
            if (source.type === 'jsonFont' )
            {
                this.loaders.fontLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded ++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
            console.log("ressources_ready")
        }
    }
}