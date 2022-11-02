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
        this.camera.camAngle.planet()
    }

    setInteriorCam()
    {
        this.camera.camAngle.interior()
    }
}

