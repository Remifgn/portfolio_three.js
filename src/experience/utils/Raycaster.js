import EventEmitter from "./EventEmitter";
import * as THREE from 'three'
import Experience from "../Experience";

export default class Raycaster extends EventEmitter{
    constructor(objectsToTest)
    {
        super()
        this.objectsToTest = objectsToTest
        this.experience = new Experience()
        this.mouse = this.experience.mouse
        this.camera = this.experience.camera

        this.instance = new THREE.Raycaster()
    }

    testMouseRay()
    {
        this.instance.setFromCamera(this.mouse.instance, this.camera.instance)
        this.intersects = this.instance.intersectObjects(this.objectsToTest)
        if(this.intersects.length)
        {
            if(!this.currentIntersect)
            {
                console.log('mouse enter')
            }
    
            this.currentIntersect = this.intersects[0]
        }
        else
        {
            if(this.currentIntersect)
            {
                console.log('mouse leave')
            }
            
            this.currentIntersect = null
        }
    }

    testMouseClick()
    {
        if(this.currentIntersect)
        {
            this.trigger('clickOnObject')
        }
    }
}
