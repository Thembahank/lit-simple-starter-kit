import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import * as echarts from 'echarts';

@customElement("my-element")
export class MyElement extends LitElement {

	static styles = [
		css`
			:host {
				display: block;
			}
		`
	];

	static properties = {
		chart: undefined,
	};

	constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.innerHTML = `
            <div id="container" style="width: 100%; height: 100%;"></div>
        `;
    }

    connectedCallback() {
        if (!this.chart) {
            let container = this.shadowRoot.querySelector("#container");
            this.chart = echarts.init(container);
			console.log(this.chart)
            this.updateChart();
        }
    }

	disconnectedCallback() {
        let container = this.shadowRoot.querySelector("#container");
        if (container) {
            container.innerHTML = "";
        }
        if (this.chart) {
            this.chart.dispose();
        }
        this.chart = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "option") {
            this.updateChart();
        } else if (name === "style") {
            let container = this.shadowRoot.querySelector("#container");
            if (container) {
                container.style = newValue;
            }
            this.resizeChart();
        }
    }

    updateChart() {
        if (!this.chart) return;
        let option = JSON.parse(this.option || "{}");
        this.chart.setOption(option);;
    }

    resizeChart() {
        if (!this.chart) return;
        this.chart.resize();
    }

    get option() {
        if (this.hasAttribute("option")) {
            return this.getAttribute("option");
        } else {
            return "{}";
        }
    }

    set option(val) {
        if (val) {
            this.setAttribute("option", val);
        } else {
            this.setAttribute("option", "{}");
        }
        this.updateChart();
    }
	@property() name = "World";

	render() {
		return html`<div id='container' class="chart-size">
		
	</div>`;
	}
}
