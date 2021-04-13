import { MEALS } from './meal-data';
import { Meal, MEALCATEGORIES } from './meal';
import { Injectable } from '@angular/core';

@Injectable()
export class MealService {
  constructor() {}

  getAllMeals(): Meal[] {
    return MEALS;
  }

  getAllMealCategories(): Array<Meal[]> {
    let allmealCategorys: Array<Meal[]> = [];

    const types = Object.values(MEALCATEGORIES);
    for (let i = 0; i < types.length; i++) {
      if (this.getAllMealsOfType(types[i]).length > 0) {
        allmealCategorys.push(this.getAllMealsOfType(types[i]));
      }
    }

    return allmealCategorys;
  }

  getAllMealsOfType(mealCategory: string): Meal[] {
    let allMeals: Meal[] = [];

    MEALS.forEach((meal) => {
      if (meal.category.includes(mealCategory)) {
        allMeals.push(meal);
      }
    });

    return allMeals;
  }

  getBestRatedMeals(): Meal[] {
    return MEALS.sort((a, b) => b.rating - a.rating).slice(0, 3);
  }

  getMeal(name: string): Meal | undefined {
    return MEALS.find((meal) => meal.name === name);
  }
}
