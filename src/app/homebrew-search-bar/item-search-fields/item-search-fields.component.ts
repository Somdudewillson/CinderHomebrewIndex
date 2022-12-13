import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  formatEnumName,
  ItemRarity,
  ItemType,
} from 'src/app/models/HomebrewEnums';
import {
  HomebrewItemSearchData,
  HomebrewSearchData,
} from 'src/app/models/HomebrewSearchData';
import { IHomebrewSearchExpander } from 'src/app/models/IHomebrewSearchExpander';
import { EnhancedBooleanInputComponent } from 'src/app/search_inputs/enhanced-boolean-input/enhanced-boolean-input.component';

@Component({
  selector: 'item-search-fields',
  templateUrl: './item-search-fields.component.html',
  styleUrls: ['./item-search-fields.component.css'],
})
export class ItemSearchFieldsComponent
  implements IHomebrewSearchExpander<HomebrewItemSearchData>
{
  formatEnumName = formatEnumName;

  @ViewChild('itemType')
  itemTypeField!: ElementRef;
  @ViewChild('rarity')
  rarityField!: ElementRef;
  @ViewChild('requiresAttunement')
  requiresAttunementField!: EnhancedBooleanInputComponent;
  @ViewChild('hasCharges')
  hasChargesField!: EnhancedBooleanInputComponent;

  itemTypeKeys: string[] = ['——'];
  itemRarityKeys: string[] = ['——'];

  ngOnInit() {
    Object.keys(ItemType)
      .filter((item) => isNaN(Number(item)))
      .forEach((item) => this.itemTypeKeys.push(item));
    Object.keys(ItemRarity)
      .filter((item) => isNaN(Number(item)))
      .forEach((item) => this.itemRarityKeys.push(item));
  }

  extendSearchData(baseData: HomebrewSearchData): HomebrewItemSearchData {
    let result = new HomebrewItemSearchData();
    HomebrewSearchData.copyHomebrewSearchData(baseData, result);

    let itemTypeInput = (this.itemTypeField.nativeElement as HTMLSelectElement)
      .selectedIndex;
    let rarityInput = (this.rarityField.nativeElement as HTMLSelectElement)
      .selectedIndex;

    result.itemType =
      itemTypeInput == 0 ? null : ((itemTypeInput - 1) as ItemType);
    result.rarity = rarityInput == 0 ? null : ((rarityInput - 1) as ItemRarity);
    result.requiresAttunement = this.requiresAttunementField.getValue();
    result.hasCharges = this.hasChargesField.getValue();

    return result;
  }
}
