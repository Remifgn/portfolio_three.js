import EventEmitter from "./EventEmitter";
import * as THREE from 'three'
import Experience from "../Experience";

export default class Mouse extends EventEmitter{
    constructor()
    {
        super()
        this.experience = new Experience
        this.instance = new THREE.Vector2()
        this.sizes = this.experience.sizes
        this.setupEventListener()
    }

    setupEventListener()
    {
        window.addEventListener('mousemove', (event) =>
        {
            this.instance.x = event.clientX / this.sizes.width * 2 - 1
            this.instance.y = - (event.clientY / this.sizes.height) * 2 + 1
        })

        window.addEventListener('click', () =>
        {
            this.trigger('click')
        })
    }


}