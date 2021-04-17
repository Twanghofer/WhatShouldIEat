import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent implements OnInit {
  constructor(private http: HttpClient) {}

  test() {
    var url =
      'https://api.spoonacular.com/recipes/complexSearch?diet=vegan&number=5&addRecipeNutrition=true&apiKey=9b4980e8d0a54201b5b9f36fbf115ab9';

    this.http.get<any>(url).subscribe((data) => {
      console.log(data.results);
    });
  }

  ngOnInit(): void {
    this.test();
  }
}
