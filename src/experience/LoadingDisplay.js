import * as THREE from 'three'
import Experience from './Experience.js'
import EventEmitter from './utils/EventEmitter.js'

export default class LoadingDisplay extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sounds = this.experience.sounds
        this.ressources = this.experience.ressources
        this.sizes = this.experience.sizes
        this.backgroundBorderAngle = 45
        // this.startButton = document.querySelector('.start')



        // Progress
        this.ressources.on('itemLoaded', () =>
        {
            this.progressRatio = (this.ressources.loaded + 1)/ this.ressources.toLoad

            document.getElementById("progressPercentage").innerHTML = Math.trunc(this.progressRatio * 100)
        })

        //Loaded
        this.ressources.on('ready', () =>
        {
            const loadingScreen = document.querySelector('.loading-screen' );
            loadingScreen.classList.add( 'fade-out' );
        })
    }

}

