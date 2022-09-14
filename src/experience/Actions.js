import Experience from "./Experience"
import WoodCabin from "./World/WoodCabin"
import Interior from "./World/Interior"

export default class Actions{
    constructor()
    {
        this.experience = new Experience()
        this.raycaster = this.experience.raycaster
        this.postprocessing = this.experience.postprocessing
        this.mouse = this.experience.mouse
        this.world = this.experience.world
        this.camera = this.experience.camera
        this.camControls = this.experience.camcontrols

        this.setActions()
        this.setActionOnHover()
        this.setActionOnClick()

    }

    setActionOnHover(){
        this.raycaster.on('hoverObjectEnter', ()=>
        {
            this.postprocessing.outlinePass.selectedObjects = this.raycaster.currentIntersect.object
            const selectedObjects = []
            selectedObjects.push( this.raycaster.currentIntersect.object )
            this.postprocessing.outlinePass.selectedObjects = selectedObjects
            console.log(selectedObjects)

        })
        this.raycaster.on('hoverObjectLeave', () =>
        {
            this.postprocessing.outlinePass.selectedObjects = []
        })
    }

    setActions()
    {
        this.actions = {}

        this.actions.sign1 = () =>
        {
            this.world.woodCabin.destroy()
            this.world.interior = new Interior()
            this.camera.transitions.interior()
            this.camControls.setInteriorCam()

        }

        this.actions.sign2 = () =>
        {
            console.log('test')
            this.world.interior.destroy()
            this.world.woodCabin = new WoodCabin()
            this.camera.transitions.default()
            this.camControls.setDefaultCam()
        }

        this.actions.sign3 = () =>
        {

        }

    }

    setActionOnClick(){
        // Mouse click event
        this.mouse.on('click', () =>
        {
            this.raycaster.testMouseClick()
        })

        this.raycaster.on('clickOnObject', () =>
        {
            const actionName = this.raycaster.currentIntersect.object.name

            const string = 'this.actions.' + actionName + '()'
            console.log(string)
            eval(string)
            // this.actions.sign2()
        })
    }
}