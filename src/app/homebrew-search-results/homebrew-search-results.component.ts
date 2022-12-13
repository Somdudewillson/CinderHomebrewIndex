import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { HomebrewData } from '../models/HomebrewData';

@Component({
  selector: 'app-homebrew-search-results',
  templateUrl: './homebrew-search-results.component.html',
  styleUrls: ['./homebrew-search-results.component.css'],
})
export class HomebrewSearchResultsComponent {
  @Input()
  searchResultsUpdate: HomebrewData[] | undefined;

  generateDescription(data: HomebrewData): string {
    return "";
  }
}
