import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/food'
  },
  {
    path: 'food',
    component: FoodComponent
  },
  {
    path: 'location',
    component: LocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
