interface ComponentConfiguration {
  selector: string;
  template: string;
  style?: string;
}
const Component = (cfg: ComponentConfiguration) => {
  return <T>(constructor: new () => T) => {
    customElements.define(
      cfg.selector,
      class extends HTMLElement {
        constructor() {
          super();
          /**
           * Create dummy template
           */
          const template = document.createElement('template');
          template.innerHTML = cfg.template.trim();
      
          if(cfg.style) {
            const stylesheet = document.createElement('style');
            stylesheet.innerHTML = cfg.style;
            template.prepend(stylesheet);
          }
          /**
           * Create shadow dom
           */
          const shadow = this.attachShadow({mode: 'open'});
          /**
           * Append children
           */
          shadow.append(...template.content.childNodes);
          
          if (cfg.style) {
            const stylesheet = document.createElement('style');
            stylesheet.innerText = cfg.style.trim();
            shadow.prepend(stylesheet);
          }
        }
      }
    );
  };
};

@Component({
  selector: 'new-component',
  template: `
    <h1>Jiří Královec</h1>
    <h4>Software developer</h4>
  `,
  style: `
  h1 {
    color: red;
  }
  `
})
class MyFirstComponent {}
