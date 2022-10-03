import $ from "jquery"


export default class TerminalTypeWriter{
    constructor(textArray)
    {
        this.idx = 0

        this.textArray = [
            "System Wakeup..... It seems that we've entered an interesting area",
            "The probe can be used to retrieve the skills that compose these galaxies",
            "Now that we know more about this system lets explore the planet!",
            "Why couldn't the pirate finish the alphabet?|He kept getting lost a C",
            "What's brown and sticky?|A stick",
            "What starts with an E, ends with an E and has one letter in it?|An Envelope",
            "What has four wheels, and flies?|A Garbage truck",
            "What do you call a pig that knows Karate?|Pork Chop",
            "Why did the scarecrow get promoted?|He was out standing in his field.",
            "I have a step ladder|I never knew my real ladder.",
            "What kind of shoes do ninjas wear?|Sneakers"
        ]

        this.setTypeWriter()
        //this.typeWriter("output", this.textArray)

    }

    setTypeWriter()
    {
        $(document).ready(() =>{
            this.captionEl = $('#caption')
        })

        this.captionLength = 0;
        this.caption = '';

        this.typeNext = () =>
        {
            if(this.idx < this.textArray.length)
            {
                this.caption = this.textArray[this.idx]
                this.type();
                this.idx++
            }
        }

        this.type = () =>
        {
            this.captionEl.html(this.caption.substr(0, this.captionLength++));
            if(this.captionLength < this.caption.length+1) {
                setTimeout(this.type, 50);
            } else {
                this.captionLength = 0;
                this.caption = '';
            }
        }

        this.testErasingEffect = () =>
        {
            this.caption = this.captionEl.html();
            this.captionLength = this.caption.length;
            if (this.captionLength>0) {
                this.erase();
            } else {
                $('#caption').html("You didn't write anything to erase, but that's ok!");
                setTimeout(this.testErasingEffect, 1000);
            }
        }

        this.erase = () =>
        {
            this.captionEl.html(this.caption.substr(0, this.captionLength--));
            if(this.captionLength >= 0) {
                setTimeout(this.erase, 50);
            } else {
                this.captionLength = 0;
                this.caption = '';
            }
        }


    }

}
        // this.typeWriter = (id, ar) =>
        // {
        //     var element = document.getElementById(id)

        //     var aString = ar[this.params.a]
        //     var eHeader = element.children[0] //Header element
        //     var eParagraph = element.children[1] //Subheader element
        //     // Determine if animation should be typing or backspacing
        //     if (!this.params.isBackspacing) {

        //         // If full string hasn't yet been typed out, continue typing
        //         if (this.params.i < aString.length) {

        //             // If character about to be typed is a pipe, switch to second line and continue.
        //             if (aString.charAt(this.params.i) == "|") {
        //                 this.params.isParagraph = true;
        //                 eHeader.classList.remove("cursor");
        //                 eParagraph.classList.add("cursor");
        //                 this.params.i++;
        //                 setTimeout(this.typeWriter(id, ar), this.params.speedBetweenLines);

        //             // If character isn't a pipe, continue typing.
        //             } else {
        //                 // Type header or subheader depending on whether pipe has been detected
        //                 if (!this.params.isParagraph) {
        //                     eHeader.textContent = (eHeader.textContent + aString.charAt(this.params.i));
        //                 }
        //                 else {
        //                     eParagraph.textContent= eParagraph.textContent + aString.charAt(this.params.i);
        //                 }
        //                 this.params.i++;
        //                 setTimeout(this.typeWriter(id, ar), this.params.speedForward);
        //             }

        //             // If full string has been typed, switch to backspace mode.
        //         }
        //         else if (this.params.i == aString.length) {

        //             this.params.isBackspacing = true;
        //             setTimeout(this.typeWriter(id, ar), this.params.speedWait)

        //         }

        //     // If backspacing is enabled
        //     } else {

        //         // If either the header or the paragraph still has text, continue backspacing
        //         if (eHeader.textContent.length > 0 || eParagraph.textContent.length > 0) {

        //         // If paragraph still has text, continue erasing, otherwise switch to the header.
        //         if (eParagraph.textContent.length > 0) {
        //             eParagraph.textContent = eParagraph.textContent.substring(0, eParagraph.textContent.length - 1)
        //         } else if (eHeader.textContent.length > 0) {
        //             eParagraph.classList.remove("cursor");
        //             eHeader.classList.add("cursor");
        //             eHeader.textContent = eHeader.textContent.substring(0, eHeader.textContent.length - 1);
        //         }
        //         setTimeout( this.typeWriter(id, ar), this.params.speedBackspace);

        //         // If neither head or paragraph still has text, switch to next quote in array and start typing.
        //         } else {

        //             this.params.isBackspacing = false;
        //             this.params.i = 0;
        //             this.params.isParagraph = false;
        //             this.params.a = (this.params.a + 1) % ar.length; //Moves to next position in array, always looping back to 0
        //             setTimeout(this.typeWriter(id, ar), 50);
        //         }
        //     }
        // }}


