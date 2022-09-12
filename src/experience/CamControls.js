import Experience from "./Experience"


export default class CamControls{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera


        this.setDefaultCam()
    }

    setDefaultCam()
    {
        this.camera.camAngle.default()
    }
}

