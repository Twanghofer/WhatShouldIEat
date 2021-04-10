import { dinnerRecipes } from './../assets/dinner-recipes';
import { breakfastRecipes } from './../assets/breakfast-recipes';
import { lunchRecipes } from 'src/assets/lunch-recipes';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  recipeTypes = [
    {
      name: 'Breakfast Recipes',
      recipes: breakfastRecipes,
    },
    { name: 'Lunch Recipes', recipes: lunchRecipes },
    {
      name: 'Dinner Recipes',
      recipes: dinnerRecipes,
    },
  ];

  recipeIndices: Array<number> = [];

  getRandomRecipes() {
    for (let i = 0; i < this.recipeTypes.length; i++) {
      //get random number
      this.getNewRecipe(i);
    }
  }

  getRandomNumber(maxNumber: number) {
    let randomNumber = Math.floor(Math.random() * maxNumber);
    return randomNumber;
  }

  getNewRecipe(index: number) {
    //get old index
    let oldIndex = this.recipeIndices[index];

    //asign new random value
    this.recipeIndices[index] = this.getRandomNumber(
      this.recipeTypes[index].recipes.length
    );

    //loop this function if it is the same index again
    if (this.recipeIndices[index] === oldIndex) {
      this.getNewRecipe(index);
    }
  }

  ngOnInit() {
    this.getRandomRecipes();
  }
}
