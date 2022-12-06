import { Component } from '@angular/core';

@Component({
  selector: 'app-homebrew-search-bar',
  templateUrl: './homebrew-search-bar.component.html',
  styleUrls: ['./homebrew-search-bar.component.css']
})
export class HomebrewSearchBarComponent {
  searchType: string|null = null;

  ngOnInit() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.searchType = urlParams.get("type");
  }

  urlHasTypeParam(): boolean {
    return this.searchType != null && this.searchType.length>0;
  }
}
