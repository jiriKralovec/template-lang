import { Component } from './lib/component';

@Component({
  selector: 'app-author',
  template: `
    <h1>Jiří Královec</h1>
    <h4>Software developer</h4>
  `,
  style: `
    h1 {
      color: red;
      margin: 0;
    }
    h4 {
      color: blue;
      font-weight: bold;
      margin: 12px 0 0;
    }
  `
})
export class AuthorComponent {}
