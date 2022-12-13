import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomebrewSearchBarComponent } from './homebrew-search-bar/homebrew-search-bar.component';
import { EnumSetInputComponent } from './search_inputs/enum-set-input/enum-set-input.component';
import { ItemSearchFieldsComponent } from './homebrew-search-bar/item-search-fields/item-search-fields.component';
import { HomebrewSearchResultsComponent } from './homebrew-search-results/homebrew-search-results.component';
import { EnhancedBooleanInputComponent } from './search_inputs/enhanced-boolean-input/enhanced-boolean-input.component';
import { EnumInputComponent } from './search_inputs/enum-input/enum-input.component';
import { ItemListingDetailComponent } from './homebrew-search-results/item-listing-detail/item-listing-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomebrewSearchBarComponent,
    EnumSetInputComponent,
    ItemSearchFieldsComponent,
    HomebrewSearchResultsComponent,
    EnhancedBooleanInputComponent,
    EnumInputComponent,
    ItemListingDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
