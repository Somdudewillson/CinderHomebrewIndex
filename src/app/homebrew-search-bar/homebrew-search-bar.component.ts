import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-homebrew-search-bar',
  templateUrl: './homebrew-search-bar.component.html',
  styleUrls: ['./homebrew-search-bar.component.css']
})
export class HomebrewSearchBarComponent {

  searchForm = new FormGroup({
    type: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });
  searchType: string|null = null;
  showAdvancedSearch = false;

  ngOnInit() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.searchType = urlParams.get("type");
  }

  urlHasTypeParam(): boolean {
    return this.searchType != null && this.searchType.length>0;
  }

  toggleAdvanced() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  doSearch(event: any) {
    console.log(event);
  }
}
