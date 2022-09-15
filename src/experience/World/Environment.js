import * as THREE from 'three'
import Experience from "../Experience"

export default class Environment
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
            this.debugFolder= this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        this.setEvironmentMap()
        this.setFog()
    }

    setFog()
    {
        //Fog
        this.fog = new THREE.Fog('#009ceb', 10, 40)
        this.scene.fog = this.fog

        if(this.debug.active)
        {
            this.debugParams = {}
            this.debugParams.color = 0x009ceb

            this.debugFolder
                .addColor(this.debugParams, 'color')
                .onChange(() =>
                {
                    this.fog.color.set(this.debugParams.color)
                })
            this.debugFolder
                .add(this.fog, 'near')
                .min(0)
                .max(20)
                .step(0.001)
            this.debugFolder
                .add(this.fog, 'far')
                .min(this.fog.near)
                .max(40)
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
        this.sunLight.position.set(3.5, 2, - 1.25)
        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 5)
                .max(5)
                .step(0.001)
        }
        this.scene.add(this.sunLight)
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