import { MealService } from './../../assets/meal.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-meal-generator',
  templateUrl: './meal-generator.component.html',
  styleUrls: ['./meal-generator.component.scss'],
})
export class MealGeneratorComponent implements OnInit {
  @ViewChildren(MatExpansionPanel) panels:
    | QueryList<MatExpansionPanel>
    | undefined;
  constructor(public mealService: MealService) {}

  public mealTypes: Array<any> = [];
  public mealIndices: Array<number> = [];

  getRandomRecipes() {
    for (let i = 0; i < this.mealTypes.length; i++) {
      //get random number
      this.getNewRecipe(i);
    }
  }

  getNewRecipe(index: number) {
    //get old index
    let oldIndex = this.mealIndices[index];

    //asign new random value
    this.mealIndices[index] = this.getRandomNumber(
      this.mealTypes[index].length
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

  getRecipeRating(rating: number, maxRating: number, maxPoints: number = 5) {
    var starsRemaining = (rating / maxRating) * maxPoints;

    const stars = [];

    for (let i = 0; i < maxPoints; i++) {
      let star = 0;
      if (starsRemaining >= 1) {
        star = 1;
      } else if (Math.round(starsRemaining * 2) / 2 >= 0.5) {
        star = 0.5;
      }

      stars.push(star);
      starsRemaining--;
    }

    return stars;
  }

  preparePrint() {
    this.expandAllPanels();
  }

  openPrint() {
    window.print();
  }

  expandAllPanels() {
    let allPanelsExpanded = false;
    this.panels?.forEach((panel) => {
      panel.expanded = true;
      if (this.panels?.last === panel) {
        allPanelsExpanded = true;
      }
    });
    let interval = setInterval(() => {
      if (allPanelsExpanded) {
        clearInterval(interval);
        this.openPrint();
      }
    }, 500);
  }

  displayTime(minutes: number): string {
    let hours = 0;

    while (minutes >= 60) {
      minutes -= 60;
      hours++;
    }

    let time = hours > 0 ? hours + 'h ' : '';
    time += minutes > 0 ? minutes + 'min ' : '';
    return time;
  }

  ngOnInit(): void {
    for (let i = 0; i < this.mealService.MEALTYPES.length; i++) {
      this.mealTypes.push(
        this.mealService.getAllMealsOfType(this.mealService.MEALTYPES[i])
      );
    }

    this.getRandomRecipes();
  }
}
