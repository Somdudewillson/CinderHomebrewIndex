import {
  ConditionType,
  CreatureType,
  DamageType,
  HomebrewType,
  ItemRarity,
  ItemType,
  MovementTypes,
  SizeClass,
  SkillType,
  SpecialSense,
  SpellComponents,
  SpellLevel,
  SpellSchool,
  StatType,
} from './HomebrewEnums';

export class HomebrewData {
  type: HomebrewType = HomebrewType.CLASS;
  title: string = '';
  author: string = '';
  link: string = '';
  tags: string[] = [];
  content: string[] = [];

  public static parseHomebrewData(input: any): HomebrewData {
    let result = input as HomebrewItemData;

    result.type = HomebrewType[input.type as keyof typeof HomebrewType];

    return result;
  }

  public static typifyHomebrewData(
    input: any
  ):
    | HomebrewData
    | HomebrewItemData
    | HomebrewMonsterData
    | HomebrewSpellData {
    switch (input['type']) {
      case HomebrewType.ITEM:
        return HomebrewItemData.parseHomebrewData(input);
      case HomebrewType.MONSTER:
        return HomebrewMonsterData.parseHomebrewData(input);
      case HomebrewType.SPELL:
        return HomebrewItemData.parseHomebrewData(input);
      default:
        return HomebrewData.parseHomebrewData(input);
    }
  }
}

export class HomebrewItemData extends HomebrewData {
  itemType: ItemType = ItemType.WONDEROUS_ITEM;
  rarity: ItemRarity = ItemRarity.COMMON;
  requiresAttunment: boolean = false;
  hasCharges: boolean = false;

  public static override parseHomebrewData(input: any): HomebrewItemData {
    let result = HomebrewData.parseHomebrewData(input) as HomebrewItemData;

    result.itemType = ItemType[input.itemType as keyof typeof ItemType];
    result.rarity = ItemRarity[input.rarity as keyof typeof ItemRarity];

    return result;
  }
}

export class HomebrewMonsterData extends HomebrewData {
  creatureType: CreatureType = CreatureType.ABERRATION;
  challengeRating: number = 0;
  armorClass: number = 0;
  hitpoints: number = 0;
  size: SizeClass = SizeClass.MEDIUM;
  specialSenses: SpecialSense[] = [];
  saveProficiencies: StatType[] = [];
  skillProficiencies: SkillType[] = [];
  conditionImmunities: ConditionType[] = [];
  vulnerabilities: DamageType[] = [];
  resistances: DamageType[] = [];
  damageImmunities: DamageType[] = [];
  legendary: boolean = false;
  mythic: boolean = false;
  hasLair: boolean = false;
  movementTypes: MovementTypes[] = [];

  public static override parseHomebrewData(input: any): HomebrewMonsterData {
    let result = HomebrewData.parseHomebrewData(input) as HomebrewMonsterData;

    result.creatureType = CreatureType[input.creatureType as keyof typeof CreatureType];
    result.size = SizeClass[input.size as keyof typeof SizeClass];
    result.specialSenses = (input.specialSenses as unknown[]).map(key=>SpecialSense[key as keyof typeof SpecialSense]);
    result.saveProficiencies = (input.saveProficiencies as unknown[]).map(key=>StatType[key as keyof typeof StatType]);
    result.skillProficiencies = (input.skillProficiencies as unknown[]).map(key=>SkillType[key as keyof typeof SkillType]);
    result.conditionImmunities = (input.conditionImmunities as unknown[]).map(key=>ConditionType[key as keyof typeof ConditionType]);
    result.vulnerabilities = (input.vulnerabilities as unknown[]).map(key=>DamageType[key as keyof typeof DamageType]);
    result.resistances = (input.resistances as unknown[]).map(key=>DamageType[key as keyof typeof DamageType]);
    result.damageImmunities = (input.damageImmunities as unknown[]).map(key=>DamageType[key as keyof typeof DamageType]);
    result.movementTypes = (input.movementTypes as unknown[]).map(key=>MovementTypes[key as keyof typeof MovementTypes]);

    return result;
  }
}

export class HomebrewSpellData extends HomebrewData {
  spellLevel: SpellLevel = SpellLevel.CANTRIP;
  school: SpellSchool = SpellSchool.ABJURATION;
  saveTypes: StatType[] = [];
  damageTypes: DamageType[] = [];
  conditions: ConditionType[] = [];
  components: SpellComponents[] = [];
  concentration: boolean = false;
  ritual: boolean = false;

  public static override parseHomebrewData(input: any): HomebrewSpellData {
    let result = HomebrewData.parseHomebrewData(input) as HomebrewSpellData;

    result.spellLevel = SpellLevel[input.spellLevel as keyof typeof SpellLevel];
    result.school = SpellSchool[input.school as keyof typeof SpellSchool];
    result.saveTypes = (input.saveTypes as unknown[]).map(key=>StatType[key as keyof typeof StatType]);
    result.damageTypes = (input.damageTypes as unknown[]).map(key=>DamageType[key as keyof typeof DamageType]);
    result.conditions = (input.conditions as unknown[]).map(key=>ConditionType[key as keyof typeof ConditionType]);
    result.components = (input.components as unknown[]).map(key=>SpellComponents[key as keyof typeof SpellComponents]);

    return result;
  }
}
