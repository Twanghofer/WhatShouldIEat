import { MealListComponent } from './meal-list/meal-list.component';
import { MealGeneratorComponent } from './meal-generator/meal-generator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MealGeneratorComponent },
  { path: 'my-meals', component: MealListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
