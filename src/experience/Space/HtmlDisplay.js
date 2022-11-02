import Experience from "../Experience";
import * as THREE from "three"

export default class HtmlDisplay{
    constructor()
    {
        this.experience = new Experience()
        this.space = this.experience.space
        this.actions = this.experience.actions
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active)
        {
            this.debugFolder= this.debug.ui.addFolder('HtmlDisplay')
        }

        this.setButtonSkills()
        this.setButtonOrbit()
    }

    setButtonSkills()
    {
        this.skillsButton = {
            position: new THREE.Vector3(-342, -205, 400),
            element: document.querySelector('.skillsBox')
        }
        this.skillsButton.element.addEventListener("click", () =>
        {
            this.actions.actions.morphLogos()
            this.skillsButton.element.classList.remove('visible')
            this.orbitButton.element.classList.add('visible')

        })
        this.actions.on('startExploration', () =>
        {
            this.skillsButton.element.classList.add('visible')
        })
        this.actions.on('leaveSpace', () =>
        {
            this.skillsButton.element.classList.remove('visible')
        })

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.skillsButton.position, 'x')
                .name('button x')
                .min(-400)
                .max(300)
                .step(0.1)
            this.debugFolder
                .add(this.skillsButton.position, 'y')
                .name('button y')
                .min(-300)
                .max(100)
                .step(0.1)

        }
    }

    setButtonOrbit()
    {

        this.orbitButton = {
            position: this.space.planet.pivot.position.clone(),
            element: document.querySelector('.orbitBox')
        }

        this.actions.on('leaveSpace', () =>
        {
            this.orbitButton.element.classList.remove('visible')
        })

        // this.actions.on('interiorView',() => {

        //     this.orbitButton.element.classList.add('visible')
        //     this.orbitButton.position.set()
        //     console.log('orbit_button')

        // })

        this.orbitButton.element.addEventListener("click", () =>
        {
            this.actions.actions.orbitPlanet()
        })

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.orbitButton.position, 'x')
                .name('button x')
                .min(-100)
                .max(100)
                .step(0.1)
            this.debugFolder
                .add(this.orbitButton.position, 'y')
                .name('button y')
                .min(-10)
                .max(10)
                .step(0.1)
            this.debugFolder
                .add(this.orbitButton.position, 'z')
                .name('button z')
                .min(-100)
                .max(100)
                .step(0.1)
        }
    }

    updatePosition(htmlElement)
    {
        const screenPosition = htmlElement.position.clone()
        screenPosition.project(this.camera.instance)
        const translateX = screenPosition.x * this.sizes.width * 0.5
        const translateY = - screenPosition.y * this.sizes.height * 0.5
        htmlElement.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }

    update()
    {
        this.updatePosition(this.skillsButton)
        this.updatePosition(this.orbitButton)
        // Get 2D screen position

    }


}