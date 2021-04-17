import { MealService } from './../assets/meal.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../assets/angular-material.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MealGeneratorComponent } from './meal-generator/meal-generator.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    MealGeneratorComponent,
    MealListComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [MealService],
  bootstrap: [AppComponent],
})
export class AppModule {}
