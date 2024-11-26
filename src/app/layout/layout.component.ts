import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-navbar></app-navbar>
      <div class="container">
          <router-outlet></router-outlet>
      </div>
      <footer class="footer">
        <div class="footer-note">
          <p >&copy; 2024 Jatin Kumar. All rights reserved.</p>
        </div>
      </footer>
  `,
  styles: `
  .container {
    max-width: 60rem;
    min-height: 90vh;
  }
  .footer-note {
    height: 100%;
    background-color: #4e5c3e;
    text-align: center;
    color: #f8f9fa;
    margin-top: 1rem
  }
  footer {
    height: 5rem;
  }

`
})
export class LayoutComponent {

}
