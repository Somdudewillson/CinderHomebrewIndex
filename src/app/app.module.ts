import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomebrewSearchBarComponent } from './homebrew-search-bar/homebrew-search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomebrewSearchBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
