import * as THREE from 'three'
import Experience from "../Experience.js"
import ForestParticle from './ForestParticle.js'


export default class Forest {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Forest_Particle')
        }
        this.setupForest()
    }

    setupForest() {
        this.forest = {}
        this.treeCount = 70
        this.minRadius = 6
        this.minScale = 0.1
        this.forestSize = 6
        this.yPos = 0.1
        this.slopeFactor = -3.26
        this.meshTab = []



        this.forest.generateForest = () => {
            // Destroy old Forest
            if (this.meshTab.length != 0) {
                for (const mesh of this.meshTab) {
                    for(const child of mesh.children)
                    {
                        child.geometry.dispose()
                        child.material.dispose()
                    }

                    this.trees.remove(mesh)
                }

            }

            // Group
            this.trees = new THREE.Group()
            this.scene.add(this.trees)
            /**
             * Geometry
             */

            const tree = new ForestParticle()
            const meshModel = tree.model.children[0]

            const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


            for (let i = 0; i < this.treeCount; i++) {

                this.meshTab[i] = meshModel.clone()
                this.trees.add(this.meshTab[i])

                // Position
                const angle = Math.random() * Math.PI * 2 // Random angle
                const radius = this.minRadius + Math.random() * this.forestSize     // Random radius
                const x = Math.cos(angle) * radius        // Get the x position using cosinus
                const z = Math.sin(angle) * radius        // Get the z position using sinus
                const y = this.yPos * (- z)
                const scale = Math.random() * 0.5 + this.minScale
                this.meshTab[i].position.set(x, clamp(y * this.slopeFactor, -10, 0), z)
                this.meshTab[i].scale.set(scale, scale, scale)

                // Rotation
                this.meshTab[i].rotation.z = (Math.random() - 0.5) * 0.4
                this.meshTab[i].rotation.y = (Math.random() - 0.5) * 0.4

                this.trees.add(this.meshTab[i])
            }
        }

        if (this.debug.active) {


            this.debugFolder
                .add(this, 'treeCount')
                .name('tree count')
                .min(0)
                .max(1000)
                .step(1)
                .onFinishChange(this.forest.generateForest)

            this.debugFolder
                .add(this, 'minRadius')
                .name('min radius')
                .min(0)
                .max(10)
                .step(0.001)
                .onFinishChange(this.forest.generateForest)

            this.debugFolder
                .add(this, 'yPos')
                .name('position y')
                .min(-10)
                .max(10)
                .step(0.001)
                .onFinishChange(this.forest.generateForest)
            this.debugFolder
                .add(this, 'forestSize')
                .name('forest Size')
                .min(0)
                .max(20)
                .step(0.01)
                .onFinishChange(this.forest.generateForest)
            this.debugFolder
                .add(this, 'minScale')
                .name('min tree size')
                .min(0)
                .max(1)
                .step(0.001)
                .onFinishChange(this.forest.generateForest)
            this.debugFolder
                .add(this, 'slopeFactor')
                .name('slope factor')
                .min(-10)
                .max(0)
                .step(0.0001)
                .onFinishChange(this.forest.generateForest)
        }

        this.forest.generateForest()
    }
}