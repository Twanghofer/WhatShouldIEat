import { MEALTYPES } from 'src/assets/meal';
import { MEALS } from './meal-data';
import { MealType } from './meal';
import { Injectable } from '@angular/core';

@Injectable()
export class MealService {
  constructor() {}

  MEALTYPES = MEALTYPES;

  getAllMeals(): any[] {
    return MEALS;
  }

  getAllMealsOfType(type: MealType): Array<any> {
    var meals: Array<any> = [];

    MEALS.forEach((meal) => {
      if (this.isMealOfType(meal, type)) {
        if (meals.indexOf(meal, 0) === -1) {
          meal.title = meal.title.toLowerCase();
          meals.push(meal);
        }
      }
    });

    return meals;
  }

  isMealOfType(meal: any, type: MealType): boolean {
    if (!meal.title) return false;

    let isType = false;

    type.keywords.forEach((keyword) => {
      meal.dishTypes.forEach((dishType: string) => {
        if (keyword.includes(dishType)) {
          isType = true;
        }
      });
    });

    return isType;
  }

  // getAllMealCategories(): Array<Object[]> {
  //   let allmealCategorys: Array<Object[]> = [];

  //   MEALCATEGORIES.forEach((category) => {
  //     if (this.getAllMealsOfType(category.keywords).length > 0) {
  //       allmealCategorys.push(this.getAllMealsOfType(category.keywords));
  //     }
  //   });

  //   return allmealCategorys;
  // }

  // getAllMealsOfType(keywords: string[]): Object[] {
  //   let allMeals: Object[] = [];

  //   MEALS.forEach((meal) => {
  //     keywords.forEach((keyword) => {
  //       if (meal.category.includes(keyword)) {
  //         allMeals.push(meal);
  //       }
  //     });
  //   });

  //   return allMeals;
  // }

  // getMealCategory(meal: Object = { dishTypes: 'test' }): MealType {
  //   var mealCategory = new MealType();
  //   return mealCategory;
  //   MEALCATEGORIES.forEach((category) => {
  //     category.keywords.forEach((keyword) => {
  //       if (meal.dishTypes.includes(keyword)) {
  //         mealCategory = category;
  //       }
  //     });
  //   });
  //   return mealCategory;
  // }

  // getBestRatedMeals(): Object[] {
  //   return MEALS.sort((a, b) => b.rating - a.rating).slice(0, 3);
  // }

  // getMeal(name: string): Object | undefined {
  //   return MEALS.find((meal) => meal.name === name);
  // }
}
