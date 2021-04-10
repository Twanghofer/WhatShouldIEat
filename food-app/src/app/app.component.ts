import { Component } from '@angular/core';
import { recipes } from 'src/assets/recipes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  recipes = recipes;
}
