import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomebrewSearchBarComponent } from './homebrew-search-bar/homebrew-search-bar.component';
import { EnumSetInputComponent } from './homebrew-search-bar/enum-set-input/enum-set-input.component';
import { ItemSearchFieldsComponent } from './homebrew-search-bar/item-search-fields/item-search-fields.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomebrewSearchBarComponent,
    EnumSetInputComponent,
    ItemSearchFieldsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
