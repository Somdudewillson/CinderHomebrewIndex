import {
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

import {
  HomebrewType,
  ItemType,
  ItemRarity,
  CreatureType,
  SizeClass,
  SpecialSense,
  StatType,
  SkillType,
  ConditionType,
  DamageType,
  MovementTypes,
  SpellLevel,
  SpellSchool,
  SpellComponents,
} from '../models/HomebrewEnums';
import { ItemSearchFieldsComponent } from './item-search-fields/item-search-fields.component';
import { HomebrewSearchData } from 'src/app/models/HomebrewSearchData';

import * as SearchIndex from '../../assets/index.json';
import { computeStringSimilarity } from '../utils/StringUtils';
import { HomebrewData } from '../models/HomebrewData';
import { HomebrewItemSearchData } from '../models/HomebrewSearchData';

const KEYWORD_SIMILARITY_THRESHOLD = 0.54;

@Component({
  selector: 'app-homebrew-search-bar',
  templateUrl: './homebrew-search-bar.component.html',
  styleUrls: ['./homebrew-search-bar.component.css'],
})
export class HomebrewSearchBarComponent {
  spellLevel = SpellLevel;

  @ViewChild('searchText')
  searchTextElement!: ElementRef;
  @ViewChild(ItemSearchFieldsComponent)
  itemSearchFields: ItemSearchFieldsComponent | undefined;

  @Output()
  newSearchResultsEvent = new EventEmitter<HomebrewData[]>();

  searchType: string | undefined;
  searchTypeFromUrl = false;
  showAdvancedSearch = false;

  ngOnInit() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('type')) {
      this.searchTypeFromUrl = true;
      this.searchType = urlParams.get('type')!;
    }
  }

  updateType(event: Event) {
    this.searchType = (event.target as HTMLSelectElement).value;
  }
  handleSearchBoxKeypress(event: Event) {
    if ((event as KeyboardEvent).key === 'Enter') {
      event.preventDefault();
      this.doSearch();
    }
  }

  toggleAdvanced() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  async doSearch() {
    let searchObject: HomebrewSearchData | HomebrewItemSearchData = this.fetchBaseSearchData();
    if (this.itemSearchFields != undefined) {
      searchObject = this.itemSearchFields.extendSearchData(searchObject);
    }

    let indexLookupResult = new Set<string>();
    if (searchObject.searchString.length > 0) {
      const searchKeywords = searchObject.searchString.split(' ');
      for (const indexKey of Object.keys(SearchIndex)) {
        let indexDistance = searchKeywords
          .map(
            (keyword) =>
              computeStringSimilarity(keyword, indexKey) /
              Math.max(keyword.length, indexKey.length)
          )
          .reduce((a, b) => (a + b + Math.min(a, b) * 2) / 3);
        indexDistance /= searchKeywords.length;

        if (indexDistance < KEYWORD_SIMILARITY_THRESHOLD) {
          SearchIndex[indexKey as keyof typeof SearchIndex].forEach(
            (dataEntry) => indexLookupResult.add(dataEntry)
          );
        }
      }
    } else {
      for (const dataFiles of Object.values(SearchIndex)) {
        if (!Array.isArray(dataFiles)) { continue; }
        dataFiles.forEach((dataEntry) => indexLookupResult.add(dataEntry));
      }
    }

    let resultList: Array<{ data: HomebrewData; score: number }> = [];
    for (const dataFileName of indexLookupResult) {
      const loadedData = HomebrewData.typifyHomebrewData(
        require(`../../assets/homebrew_data/${dataFileName}.json`)
      );
      const dataScore = searchObject.scoreDataMatch(loadedData);

      if (dataScore > 0) {
        resultList.push({ data: loadedData, score: dataScore });
      }
    }
    resultList.sort((a, b) => b.score - a.score);

    console.log(resultList);
    this.newSearchResultsEvent.emit(
      resultList.map((sortableData) => sortableData.data)
    );
  }

  fetchBaseSearchData(): HomebrewSearchData {
    let result = new HomebrewSearchData();

    result.searchString = (
      this.searchTextElement.nativeElement as HTMLInputElement
    ).value.trim();
    if (this.searchType != undefined && this.searchType.length > 0) {
      result.type = HomebrewType[this.searchType as keyof typeof HomebrewType];
    }

    return result;
  }
}
