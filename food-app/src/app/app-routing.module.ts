import { SidenavComponent } from './sidenav/sidenav.component';
import { MealGeneratorComponent } from './meal-generator/meal-generator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MealGeneratorComponent },
  { path: 'nav', component: SidenavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
