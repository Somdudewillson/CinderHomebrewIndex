import { HomebrewType, ItemType, ItemRarity, CreatureType, SizeClass, SpecialSense, StatType, SkillType, ConditionType, DamageType, MovementTypes, SpellLevel, SpellSchool, SpellComponents } from "./HomebrewEnums";

export class HomebrewSearchData {
  type: HomebrewType = HomebrewType.CLASS;
  author: String = '';
  tags: String[] = [];
}

export class HomebrewItemSearchData extends HomebrewSearchData {
  itemType: ItemType = ItemType.WONDEROUS_ITEM;
  rarity: ItemRarity = ItemRarity.COMMON;
  requiresAttunment: boolean = false;
  hasCharges: boolean = false;
}

export class HomebrewMonsterSearchData extends HomebrewSearchData {
    creatureType: CreatureType = CreatureType.ABERRATION;
    challengeRating: number = 0.;
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
}

export class HomebrewSpellSearchData extends HomebrewSearchData {
    spellLevel: SpellLevel = SpellLevel.CANTRIP;
    school: SpellSchool = SpellSchool.ABJURATION;
    saveTypes: StatType[] = [];
    damageTypes: DamageType[] = [];
    conditions: ConditionType[] = [];
    components: SpellComponents[] = [];
    concentration: boolean = false;
    ritual: boolean = false;
}
