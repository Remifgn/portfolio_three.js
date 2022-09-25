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
        this.space = this.experience.space
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

        })
        this.raycaster.on('hoverObjectLeave', () =>
        {
            this.postprocessing.outlinePass.selectedObjects = []
        })
    }

    setActions()
    {
        this.actions = {}
        this.actions.satelliteClicks = 0
        this.actions.textClicks = 0
        this.actions.default = () =>
        {
            this.camera.camAngle.spaceUnlocked()
        }

        this.actions.sign1 = () =>
        {
            this.world.woodCabin.destroy()
            this.world.interior = new Interior()
            this.camera.transitions.interior(2)
            this.camera.camAngle.interior()

        }

        this.actions.sign2 = () =>
        {
            console.log('test')
            this.world.interior.destroy()
            this.world.woodCabin = new WoodCabin()
            this.camera.transitions.default(2)
            this.camera.camAngle.default()
        }

        this.actions.satellite = () =>
        {

            switch (this.actions.satelliteClicks)
            {
                case 0:
                    this.space.blenderParticle.triggerMorph()
                  break;
                case 1:
                    this.space.pythonParticle.triggerMorph()
                  break;
                case 2:
                    this.space.gitParticle.triggerMorph()
                  break;
                case 3:
                    this.space.cParticle.triggerMorph()
                  break;
                case 4:
                    this.space.jsParticle.triggerMorph()
                  break;
                case 5:
                    this.space.htmlParticle.triggerMorph()
                  break;
                case 6:
                    this.space.satellite.moveToOrbit()
                  break;
              }
            this.actions.satelliteClicks++

        }

        this.actions.insa_logo = () =>
        {
            window.open('https://www.insa-rennes.fr/eii.html', '_blank').focus();
        }
        this.actions.strathclyde_logo = () =>
        {
            window.open('https://www.strath.ac.uk/courses/postgraduatetaught/electronicelectricalengineering/', '_blank').focus();
        }
        this.actions.instagramme_logo = () =>
        {
            window.open('https://www.instagram.com/polymoufle/', '_blank').focus();
        }
        this.actions.linkedin_logo = () =>
        {
            window.open('https://www.linkedin.com/in/r%C3%A9mi-fargeon-581634132/', '_blank').focus();
        }
        this.actions.artline_logo = () =>
        {
            window.open('https://www.artstation.com/user-642697', '_blank').focus();
        }
        this.actions.upwork_logo = () =>
        {
            window.open('https://www.upwork.com/freelancers/~01360880391a70a64d', '_blank').focus();
        }
        this.actions.github_logo = () =>
        {
            window.open('https://github.com/Remifgn/portfolio_three.js', '_blank').focus();
        }


        this.actions.welcome = () =>
        {
            if (this.actions.textClicks <= this.space.textParticle.textContent.length)
            {
                this.space.textParticle.triggerMorph()
            }
            else
            {
                if(this.camera.camAngle.enabled !== 'spaceUnlocked')
                {
                    this.camera.camAngle.spaceUnlocked()
                }
                this.space.satellite.addToObjectToTest()

            }
            this.actions.textClicks++
        }

    }

    setActionOnClick(){
        // Mouse click event
        this.mouse.on('click', () =>
        {
            this.raycaster.testMouseClick()
            this.actions.welcome()
        })

        this.raycaster.on('clickOnObject', () =>
        {
            const actionName = this.raycaster.currentIntersect.object.name

            const string = 'this.actions.' + actionName + '()'

            eval(string)
            // this.actions.sign2()
        })
    }
}