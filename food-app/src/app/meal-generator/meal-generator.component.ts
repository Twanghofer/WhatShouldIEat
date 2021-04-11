import { Component, OnInit } from '@angular/core';
import { dinnerRecipes } from 'src/assets/dinner-recipes';
import { breakfastRecipes } from 'src/assets/breakfast-recipes';
import { lunchRecipes } from 'src/assets/lunch-recipes';

@Component({
  selector: 'app-meal-generator',
  templateUrl: './meal-generator.component.html',
  styleUrls: ['./meal-generator.component.scss'],
})
export class MealGeneratorComponent implements OnInit {
  recipeTypes = [
    {
      name: 'Breakfast',
      recipes: breakfastRecipes,
    },
    { name: 'Lunch', recipes: lunchRecipes },
    {
      name: 'Dinner',
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

  getRecipeRating(rating: number, maxRating: number) {
    const stars = [];

    let starsRemaining = rating;

    for (let i = 0; i < maxRating; i++) {
      let star = 0;
      if (starsRemaining >= 1) {
        star = 1;
      } else if (starsRemaining > 0) {
        star = 0.5;
      }

      stars.push(star);
      starsRemaining--;
    }

    return stars;
  }

  ngOnInit() {
    this.getRandomRecipes();
  }
}
