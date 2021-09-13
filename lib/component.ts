interface ComponentConfiguration {
  selector: string;
  template: string;
  style?: string;
}
export const Component = (cfg: ComponentConfiguration) => {
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

          if (cfg.style) {
            const stylesheet = document.createElement('style');
            stylesheet.innerHTML = cfg.style;
            template.prepend(stylesheet);
          }
          /**
           * Create shadow dom
           */
          const shadow = this.attachShadow({ mode: 'open' });
          /**
           * Append children
           */
          shadow.append(...template.content.childNodes);
          /**
           * Append styling if any
           */
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
