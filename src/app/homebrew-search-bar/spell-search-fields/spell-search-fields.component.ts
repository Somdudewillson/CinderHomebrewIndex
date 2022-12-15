import { Component, ViewChild } from '@angular/core';
import { SpellLevel, SpellSchool, StatType, DamageType, ConditionType, SpellComponents } from 'src/app/models/HomebrewEnums';
import { HomebrewSearchData, HomebrewSpellSearchData } from 'src/app/models/HomebrewSearchData';
import { IHomebrewSearchExpander } from 'src/app/models/IHomebrewSearchExpander';
import { EnhancedBooleanInputComponent } from 'src/app/search_inputs/enhanced-boolean-input/enhanced-boolean-input.component';
import { EnumInputComponent } from 'src/app/search_inputs/enum-input/enum-input.component';
import { EnumSetInputComponent } from 'src/app/search_inputs/enum-set-input/enum-set-input.component';

@Component({
  selector: 'spell-search-fields',
  templateUrl: './spell-search-fields.component.html',
  styleUrls: ['./spell-search-fields.component.css']
})
export class SpellSearchFieldsComponent
implements IHomebrewSearchExpander<HomebrewSpellSearchData> {
  SpellLevel = SpellLevel;
  SpellSchool = SpellSchool;
  StatType = StatType;
  DamageType = DamageType;
  ConditionType = ConditionType;
  SpellComponents = SpellComponents;

  @ViewChild('spellLevel')
  spellLevelField!: EnumInputComponent<SpellLevel>;
  @ViewChild('school')
  schoolField!: EnumInputComponent<SpellSchool>;
  @ViewChild('saveTypes')
  saveTypesField!: EnumSetInputComponent<StatType>;
  @ViewChild('damageTypes')
  damageTypesField!: EnumSetInputComponent<DamageType>;
  @ViewChild('conditions')
  conditionsField!: EnumSetInputComponent<ConditionType>;
  @ViewChild('components')
  componentsField!: EnumSetInputComponent<SpellComponents>;
  @ViewChild('concentration')
  concentrationField!: EnhancedBooleanInputComponent;
  @ViewChild('ritual')
  ritualField!: EnhancedBooleanInputComponent;

  extendSearchData(baseData: HomebrewSearchData): HomebrewSpellSearchData {
    let result = new HomebrewSpellSearchData();
    HomebrewSearchData.copyHomebrewSearchData(baseData, result);

    result.spellLevel = this.spellLevelField.getValue();
    result.school = this.schoolField.getValue();
    result.saveTypes = this.saveTypesField.getValue();
    result.damageTypes = this.damageTypesField.getValue();
    result.conditions = this.conditionsField.getValue();
    result.components = this.componentsField.getValue();
    result.concentration = this.concentrationField.getValue();
    result.ritual = this.ritualField.getValue();

    return result;
  }

}
