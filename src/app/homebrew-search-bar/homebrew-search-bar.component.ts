import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

import { HomebrewType, ItemType, ItemRarity, CreatureType, SizeClass, SpecialSense, StatType, SkillType, ConditionType, DamageType, MovementTypes, SpellLevel, SpellSchool, SpellComponents } from "../models/HomebrewEnums";
import { ItemSearchFieldsComponent } from './item-search-fields/item-search-fields.component';
import { HomebrewSearchData } from 'src/app/models/HomebrewSearchData';

import * as SearchIndex from '../../assets/index.json';
import { computeStringSimilarity } from '../utils/StringUtils';
import { HomebrewData } from '../models/HomebrewData';

const KEYWORD_SIMILARITY_THRESHOLD = 0.54;

@Component({
  selector: 'app-homebrew-search-bar',
  templateUrl: './homebrew-search-bar.component.html',
  styleUrls: ['./homebrew-search-bar.component.css']
})
export class HomebrewSearchBarComponent {
  spellLevel = SpellLevel;

  @ViewChild('searchText')
  searchTextElement!: ElementRef;
  @ViewChild(ItemSearchFieldsComponent)
  itemSearchFields!: ItemSearchFieldsComponent;

  @Output()
  newSearchResultsEvent = new EventEmitter<HomebrewData[]>();

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

  async doSearch() {
    let baseSearch = this.fetchBaseSearchData();
    let extendedSearch = this.itemSearchFields.extendSearchData(baseSearch);

    let indexLookupResult = new Set<string>();
    const searchKeywords = extendedSearch.searchString.split(" ");
    for (const indexKey of Object.keys(SearchIndex)) {
      let indexDistance = searchKeywords
        .map(keyword=>computeStringSimilarity(keyword,indexKey)/Math.max(keyword.length,indexKey.length))
        .reduce((a,b)=>(a+b+Math.min(a,b)*2)/3);
      indexDistance /= searchKeywords.length;

      if (indexDistance<KEYWORD_SIMILARITY_THRESHOLD) {
        SearchIndex[indexKey as keyof typeof SearchIndex]
          .forEach(dataEntry=>indexLookupResult.add(dataEntry));
      }
    }

    let resultList: Array<{data:HomebrewData,score:number}> = [];
    for (const dataFileName of indexLookupResult) {
      const loadedData = HomebrewData.typifyHomebrewData(require(`../../assets/homebrew_data/${dataFileName}.json`));
      const dataScore = extendedSearch.scoreDataMatch(loadedData);

      if (dataScore>0) {
        resultList.push({data:loadedData,score:dataScore});
      }
    }
    resultList.sort((a,b)=>b.score-a.score);

    console.log(resultList);
    this.newSearchResultsEvent.emit(resultList.map(sortableData=>sortableData.data));
  }

  fetchBaseSearchData(): HomebrewSearchData {
    let result = new HomebrewSearchData();

    result.searchString = (this.searchTextElement.nativeElement as HTMLInputElement).value;
    //result.type = this.searchType==null?:this.searchType;

    return result;
  }
}
