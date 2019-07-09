class MDIComponent extends HTMLElement {

  constructor(...args) {
    super(...args);
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  get preTemplate() {

    const name = this.getAttribute("name");
    const filePath = `/node_modules/@mdi/svg/svg/${name}.svg`;

    if (!name) throw new Error("'path' and 'name' attributes are both null");

    return /*html*/`
      <object type="image/svg+xml" data="${filePath}"></object>
    `
  }

  template(path) {

    const inheritedStyle = window.getComputedStyle(this);
    const inheritedSize = inheritedStyle.getPropertyValue("font-size");
    const inheritedColor = inheritedStyle.getPropertyValue("color");

    const size = this.getAttribute("size") || inheritedSize;
    const color = this.getAttribute("color") || inheritedColor;

    const containerClasses = ["container"];
    if (this.hasAttribute("horizontal")) containerClasses.push("flip-h");
    if (this.hasAttribute("vertical")) containerClasses.push("flip-v");

    return /*html*/`
      <style>
        .container {
          display: inline-block;
        }

        .flip-h {
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
          filter: FlipH;
          -ms-filter: "FlipH";
        }

        .flip-v {
          -webkit-transform: scaleY(-1);
          transform: scaleY(-1);
          filter: FlipV;
          -ms-filter: "FlipV";
        }

        .rotate {
          -webkit-transform: rotate(${this.getAttribute("rotate")}deg);
          -ms-transform: rotate(${this.getAttribute("rotate")}deg);
          transform: rotate(${this.getAttribute("rotate")}deg);
        }

        @-webkit-keyframes mdi-spin {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
          }
        }
        @keyframes mdi-spin {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
          }
        }

        .spin {
          -webkit-animation: mdi-spin 2s infinite linear;
          animation: mdi-spin 2s infinite linear;
        }
      </style>
      <span class="container ${this.hasAttribute("horizontal") ? "flip-h" : ""}">
        <span class="container ${this.hasAttribute("vertical") ? "flip-v" : ""}">
          <span class="container ${this.getAttribute("rotate") ? "rotate" : ""}">
            <span class="container ${this.hasAttribute("spin") ? "spin" : ""}">
              <svg height="${size}" width="${size}" viewBox="0 0 24 24">
                <path fill="${color}" d="${path}"/>
              </svg>
            </span>
          </span>
        </span>
      </span>
    `;
  }

  static get observedAttributes() {
    return ["path", "name", "size", "horizontal", "vertical", "spin", "rotate"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const path = this.getAttribute("path");
    if (path) return this.setView(this.template(path));
    this.setPreTemplate();
  }

  setPreTemplate() {
    this.setView(this.preTemplate);

    const objectElement = this.shadow.querySelector("object");
    objectElement.addEventListener("load", () => {
      const svgDoc = objectElement.contentDocument;
      const pathElement = svgDoc.querySelector("path");
      const path = pathElement.getAttribute("d");
      this.setAttribute("path", path);
      this.render();
    })
  }

  setView(template) {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = template;
    this.shadow.innerHTML = ``;
    this.shadow.appendChild(templateEl.content.cloneNode(true));
  }
}

customElements.define('mdi-component', MDIComponent);