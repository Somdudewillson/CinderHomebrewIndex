import { Component, ElementRef, ViewChild } from '@angular/core';
import { formatEnumName, ItemRarity, ItemType } from 'src/app/models/HomebrewEnums';
import { HomebrewItemSearchData, HomebrewSearchData } from 'src/app/models/HomebrewSearchData';
import { IHomebrewSearchExpander } from 'src/app/models/IHomebrewSearchExpander';

@Component({
  selector: 'item-search-fields',
  templateUrl: './item-search-fields.component.html',
  styleUrls: ['./item-search-fields.component.css']
})
export class ItemSearchFieldsComponent implements IHomebrewSearchExpander<HomebrewItemSearchData> {
  formatEnumName = formatEnumName;

  @ViewChild('itemType')
  itemTypeField!: ElementRef;
  @ViewChild('rarity')
  rarityField!: ElementRef;
  @ViewChild('requiresAttunment')
  requiresAttunmentField!: ElementRef;
  @ViewChild('hasCharges')
  hasChargesField!: ElementRef;

  itemTypeKeys:string[] = []
  itemRarityKeys:string[] = []

  ngOnInit() {
    this.itemTypeKeys = Object.keys(ItemType)
      .filter(item => isNaN(Number(item)));
    this.itemRarityKeys = Object.keys(ItemRarity)
      .filter(item => isNaN(Number(item)));
  }

  extendSearchData(baseData: HomebrewSearchData): HomebrewItemSearchData {
    let result = baseData as HomebrewItemSearchData;

    result.itemType = (this.itemTypeField.nativeElement as HTMLSelectElement).selectedIndex;
    result.rarity = (this.rarityField.nativeElement as HTMLSelectElement).selectedIndex;
    result.requiresAttunment = (this.requiresAttunmentField.nativeElement as HTMLInputElement).checked;
    result.hasCharges = (this.hasChargesField.nativeElement as HTMLInputElement).checked;

    return result;
  }
}
