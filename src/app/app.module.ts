import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodComponent } from './food/food.component';
import { LocationComponent } from './location/location.component';
import { RclModule } from 'projects/rcl/src/public_api';


@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    LocationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RclModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
