import { getPath } from "./iconExtractor.js";

class MDIComponent extends HTMLElement {

  constructor() {
    super();
  }

  get template() {

    const inheritedStyle = window.getComputedStyle(this);
    const fontSize = inheritedStyle.getPropertyValue("font-size");
    const color = inheritedStyle.getPropertyValue("color");

    return /*html*/`
      <style>
      </style>
      <svg height="${fontSize}" width="${fontSize}" viewBox="0 0 24 24">
        <path fill="${color}" d="${getPath(this.getAttribute('name'))}"/>
      </svg>
    `
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.template;
    this.appendChild(templateEl.content.cloneNode(true));
  }
}

customElements.define('mdi-component', MDIComponent);