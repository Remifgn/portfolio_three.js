import * as THREE from 'three'
import Experience from "../Experience"

export default class SpaceEnvironment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.debug = this.experience.debug


        // Debug

        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('SpaceEnvironment')
        }

        this.setSunLight()
        this.setAmbientLight()
        this.setEvironmentMap()
        this.setEmisphereLight()
        //this.setFog()
    }

    setFog()
    {
        //Fog
        this.fog = new THREE.Fog('#234ba9', 6.564, 104.241)
        this.scene.fog = this.fog

        if(this.debug.active)
        {
            this.debugParams = {}
            this.debugParams.color = 0x234ba9

            this.debugFolder
                .addColor(this.debugParams, 'color')
                .onChange(() =>
                {
                    this.fog.color.set(this.debugParams.color)
                })
            this.debugFolder
                .add(this.fog, 'near')
                .min(0)
                .max(40)
                .step(0.001)
            this.debugFolder
                .add(this.fog, 'far')
                .min(0)
                .max(200)
                .step(0.001)

        }
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(4.5, 15.6, 5.7)
        // Debug
        if(this.debug.active)
        {
            const sunHelper = new THREE.DirectionalLightHelper(this.sunLight)
            this.scene.add(sunHelper)
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 50)
                .max(50)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 50)
                .max(50)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 50)
                .max(50)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.rotation, 'x')
                .name('sunLightRotx')
                .min(- Math.PI)
                .max(Math.PI)
                .step(0.001)
            this.debugFolder
                .add(this.sunLight.rotation, 'y')
                .name('sunLightRoty')
                .min(- Math.PI)
                .max(Math.PI)
                .step(0.001)
            this.debugFolder
                .add(this.sunLight.rotation, 'z')
                .name('sunLightRotz')
                .min(- Math.PI)
                .max(Math.PI)
                .step(0.001)
        }
        this.scene.add(this.sunLight)
    }


    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight( 0x080808 )
        this.scene.add( this.ambientLight )
    }

    setEmisphereLight()
    {
        this.emiLight = new THREE.HemisphereLight( 0xe2a66f, 0x0400f5, 2.624 );
        this.emiLight.position.set(14.59, 2.3, 14.59)

        this.scene.add( this.emiLight );
        if(this.debug.active)
        {
            const emiHelper = new THREE.HemisphereLightHelper(this.emiLight)
            this.scene.add(emiHelper)
            this.debugParams = {}
            this.debugParams.colorEmiNord = 0xe2a66f
            this.debugParams.colorEmiSud = 0x0400f5
            this.debugParams.intensityEmi = 2.624
            console.log(this.debugFolder)


            this.debugFolder
                .addColor(this.debugParams, 'colorEmiNord')
                .onChange(() =>
                {
                    this.emiLight.color.set(this.debugParams.colorEmiNord)
                })
            this.debugFolder
                .addColor(this.debugParams, 'colorEmiSud')
                .onChange(() =>
                {
                    this.emiLight.groundColor.set(this.debugParams.colorEmiSud)
                })

            this.debugFolder
                .add(this.emiLight, 'intensity')
                .name('Emi Intensity')
                .min(0)
                .max(10)
                .step(0.001)
            this.debugFolder
                .add(this.emiLight.position, 'x')
                .name('Emi x')
                .min(-20)
                .max(20)
                .step(0.01)
            this.debugFolder
                .add(this.emiLight.position, 'y')
                .name('Emi y')
                .min(-20)
                .max(20)
                .step(0.01)
            this.debugFolder
                .add(this.emiLight.position, 'z')
                .name('Emi z')
                .min(-20)
                .max(20)
                .step(0.01)
        }

    }


    setEvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.ressources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>{

            this.scene.traverse((child) =>
            {
                if (child instanceof THREE.Mesh
                    && child.material instanceof THREE.MeshStandardMaterial)
                    {
                        child.material.envMap = this.environmentMap.texture
                        child.material.envMapIntensity = this.environmentMap.intensity
                        child.material.needsUpdate = true
                    }
            })
        }

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }

        this.environmentMap.updateMaterials()
    }

}