import {Component, signal} from '@angular/core';
import {Layout} from './shared/presentation/layout/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    Layout
  ],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catch-up');
}
