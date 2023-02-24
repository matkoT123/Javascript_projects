//number element
class CustomInputElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const style = document.createElement("style");
        style.textContent = `
            input[type=number] {
                width:100px;
                background: rgb(245, 245, 245);
                border: 1.5px solid rgb(220, 220, 220);
                border-radius: 7%;
            }
        `;

        var min = this.hasAttribute("min") ? this.getAttribute("min") : 1;
        var max = this.hasAttribute("max") ? this.getAttribute("max") : 10;
        var value = this.hasAttribute("value") ? this.getAttribute("value") : 5;

        const input = document.createElement("input");
        input.setAttribute("type", "number");

        input.addEventListener("change", function () {
            if (input.value < max || input.value > min) updateInputIndex(input.value);
            else if (input.value > max) updateInputIndex(max);
            else if (input.value < min) updateInputIndex(min);
        });

        input.setAttribute("min", min);
        input.setAttribute("max", max);
        input.setAttribute("value", value);
        this.shadowRoot.append(input, style);
    }
}

if (!customElements.get('my-input')) {
    customElements.define('my-input', CustomInputElement)
}

//SLIDER ELEMENT
class CustomSliderElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const style = document.createElement("style");
        style.textContent = `
            input[type=range] {
                -webkit-appearance: none;
                margin: 0.5rem 0rem;
                width: 100px;
                height: 8px;
                background: white;
                border: 1.5px solid rgb(220, 220, 220);
                border-radius: 10%;
            }
   
            input[type=range]::-webkit-slider-thumb {
                appearance: none;
                width: 38px;
                height: 20px;
                border: 1.5px solid rgb(220, 220, 220);
                border-radius: 10%;
                background: rgb(245 245 245);
                cursor: pointer;
            }
        `;

        const input = document.createElement("input");
        input.setAttribute("type", "range");
        
        input.addEventListener("change", function () {
            updateSliderIndex(input.value)
        });

        let min = this.hasAttribute("min") ? this.getAttribute("min") : 1;
        let max = this.hasAttribute("max") ? this.getAttribute("max") : 10;
        let value = this.hasAttribute("value") ? this.getAttribute("value") : 1;

        input.setAttribute("min", min);
        input.setAttribute("max", max);
        input.setAttribute("value", value);
        this.shadowRoot.append(input, style);
    }
}

if (!customElements.get('my-slider')) {
    customElements.define('my-slider', CustomSliderElement)
}