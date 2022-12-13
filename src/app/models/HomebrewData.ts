import { ConditionType, CreatureType, DamageType, HomebrewType, ItemRarity, ItemType, MovementTypes, SizeClass, SkillType, SpecialSense, SpellComponents, SpellLevel, SpellSchool, StatType } from "./HomebrewEnums";

export class HomebrewData {
    type: HomebrewType = HomebrewType.CLASS;
    title: string = '';
    author: string = '';
    link: string = '';
    tags: string[] = [];
    content: string[] = [];

    public static typifyHomebrewData(input: any): HomebrewData|HomebrewItemData|HomebrewMonsterSearchData|HomebrewSpellSearchData {
        switch(input["type"]) {
            case HomebrewType.ITEM:
                return input as HomebrewItemData;
            case HomebrewType.MONSTER:
                return input as HomebrewMonsterSearchData;
            case HomebrewType.SPELL:
                return input as HomebrewSpellSearchData;
            default:
                return input as HomebrewData;
        }
    }
}

export class HomebrewItemData extends HomebrewData {
  itemType: ItemType = ItemType.WONDEROUS_ITEM;
  rarity: ItemRarity = ItemRarity.COMMON;
  requiresAttunment: boolean = false;
  hasCharges: boolean = false;
}

export class HomebrewMonsterSearchData extends HomebrewData {
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

export class HomebrewSpellSearchData extends HomebrewData {
    spellLevel: SpellLevel = SpellLevel.CANTRIP;
    school: SpellSchool = SpellSchool.ABJURATION;
    saveTypes: StatType[] = [];
    damageTypes: DamageType[] = [];
    conditions: ConditionType[] = [];
    components: SpellComponents[] = [];
    concentration: boolean = false;
    ritual: boolean = false;
}
