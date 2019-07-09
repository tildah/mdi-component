# Web Component for Material Design Icons

This is a package that implements material design icons in es6 web components.

```
npm i mdi-component
```

## Usage
**HTML**

```html
<body>
  <mdi-component 
    name="account-circle"
    size="36px"
    horizontal
    vertical
    rotate="45"
    color="blue"
    >
  </mdi-component>
  <script src="/node_modules/mdi-component/mdi-component.js"></script>
</body>
```

## Attributes

| Attribute  | Default                  | Details |
|------------|--------------------------|---------|
| name       | `null`                   | Icon name |
| path       | required if name is null | SVG path data. Usually from [@mdi/js](https://github.com/Templarian/MaterialDesign-JS)
| size       | inherited                | `40px`, `1.3rem`... |
| horizontal | inexistant               | Flip horizontal |
| vertical   | inexistant               | Flip vertical |
| rotate     | 0                        | Degrees `0` to `360` |
| color      | inherited                | `rgb()` / `rgba()` / `#000` |
| spin       | inexistant               | Spin animation |

## Use of `path` attribute
In order to use the attribute `path`, the component must be used in an ES6 module. Eg:
**HTML**
```html
<body>
  <main-page></main-page>
  <script src="./main.js" type="module"></script>
</body>
```
**JS (main.js)**
```javascript
import { mdiAccount } from "/node_modules/@mdi/js/mdi.js";
import "/node_modules/mdi-component/mdi-component.js";

class MainPage extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadow.innerHTML = "";
    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.template;
    this.shadow.appendChild(templateEl.content.cloneNode(true));
  }

  get template() {
    return `
      <mdi-component
        path="${mdiAccount}"
        >
      </mdi-component>
    `;
  }

}

customElements.define("main-page", MainPage);

```
