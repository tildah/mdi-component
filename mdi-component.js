import { getPath } from "./iconExtractor.js";

class MDIComponent extends HTMLElement {

  constructor() {
    super();
  }

  get preTemplate() {

    const filePath = `/node_modules/@mdi/svg/svg/${this.getAttribute("name")}.svg`;

    return /*html*/`
      <style>
      </style>
      <object type="image/svg+xml" data="${filePath}"></object>
    `
  }

  get template() {

    const inheritedStyle = window.getComputedStyle(this);
    const fontSize = inheritedStyle.getPropertyValue("font-size");
    const color = inheritedStyle.getPropertyValue("color");

    const objectElement = this.querySelector("object");
    const svgDoc = objectElement.contentDocument;
    const path = svgDoc.querySelector("path");

    return /*html*/`
      <svg height="${fontSize}" width="${fontSize}" viewBox="0 0 24 24">
        <path fill="${color}" d="${path.getAttribute('d')}"/>
      </svg>
    `;
  }

  connectedCallback() {
    this.render("preTemplate");
    
    const objectElement = this.querySelector("object");
    objectElement.addEventListener("load", ()=> {
      this.render("template");
    })
  }

  render(type) {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = this[type];
    this.innerHTML = ``;
    this.appendChild(templateEl.content.cloneNode(true));
  }
}

customElements.define('mdi-component', MDIComponent);