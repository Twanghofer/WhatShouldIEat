import { MealService } from './../../assets/meal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-generator',
  templateUrl: './meal-generator.component.html',
  styleUrls: ['./meal-generator.component.scss'],
})
export class MealGeneratorComponent implements OnInit {
  constructor(public mealService: MealService) {}

  public mealCategories = this.mealService.getAllMealCategories();
  public mealIndices: Array<number> = [];

  getRandomRecipes() {
    for (let i = 0; i < this.mealCategories.length; i++) {
      //get random number
      this.getNewRecipe(i);
    }
  }

  getNewRecipe(index: number) {
    //get old index
    let oldIndex = this.mealIndices[index];

    //asign new random value
    this.mealIndices[index] = this.getRandomNumber(
      this.mealCategories[index].length
    );

    //loop this function if it is the same index again
    if (this.mealIndices[index] === oldIndex) {
      this.getNewRecipe(index);
    }
  }

  getRandomNumber(maxNumber: number) {
    let randomNumber = Math.floor(Math.random() * maxNumber);
    return randomNumber;
  }

  getRecipeRating(rating: number, maxRating: number = 5) {
    const stars = [];

    let starsRemaining = rating;

    for (let i = 0; i < maxRating; i++) {
      let star = 0;
      if (starsRemaining >= 1) {
        star = 1;
      } else if (Math.round(starsRemaining * 2) / 2 > 0.5) {
        star = 0.5;
      }

      stars.push(star);
      starsRemaining--;
    }

    return stars;
  }

  getRecipeTime(time: number, maxRating: number = 3) {
    const maxTime = 1.5;
    var timeRating = (time / maxTime) * maxRating;

    return this.getRecipeRating(timeRating, maxRating);
  }

  ngOnInit(): void {
    this.getRandomRecipes();
    console.log(this.mealCategories);
  }
}
