import { Component } from '@angular/core';
import { HomebrewData } from './models/HomebrewData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CinderHomebrewIndex';

  latestSearchListing: HomebrewData[] | undefined;
  passSearchResults(newSearchListing: HomebrewData[]) {
    this.latestSearchListing = newSearchListing;
  }
}
