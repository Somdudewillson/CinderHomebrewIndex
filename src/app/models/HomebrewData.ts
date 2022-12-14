import {
  ConditionType,
  CreatureType,
  DamageType,
  HomebrewType,
  ItemRarity,
  ItemType,
  MovementTypes,
  parseEnum,
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
    let result = new HomebrewData();

    result.type = parseEnum(input.type,HomebrewType);
    result.title = input.title;
    result.author = input.author;
    result.link = input.link;
    result.tags = input.tags;
    result.content = input.content;

    return result;
  }

  public static copyHomebrewBaseData(source: HomebrewData, target: HomebrewData) {
    target.type = source.type;
    target.title = source.title;
    target.author = source.author;
    target.link = source.link;
    target.tags = source.tags;
    target.content = source.content;
  }

  public static typifyHomebrewData(
    input: any
  ):
    | HomebrewData
    | HomebrewItemData
    | HomebrewMonsterData
    | HomebrewSpellData {
    switch (parseEnum(input.type,HomebrewType)) {
      case HomebrewType.ITEM:
        return HomebrewItemData.parseHomebrewData(input);
      case HomebrewType.MONSTER:
        return HomebrewMonsterData.parseHomebrewData(input);
      case HomebrewType.SPELL:
        return HomebrewSpellData.parseHomebrewData(input);
      default:
        return HomebrewData.parseHomebrewData(input);
    }
  }
}

export class HomebrewItemData extends HomebrewData {
  itemType: ItemType = ItemType.WONDEROUS_ITEM;
  rarity: ItemRarity = ItemRarity.COMMON;
  requiresAttunement: boolean = false;
  hasCharges: boolean = false;

  public static override parseHomebrewData(input: any): HomebrewItemData {
    let result = new HomebrewItemData();
    HomebrewData.copyHomebrewBaseData(HomebrewData.parseHomebrewData(input),result);

    result.itemType = parseEnum(input.itemType,ItemType);
    result.rarity = parseEnum(input.rarity,ItemRarity);
    result.requiresAttunement = input.requiresAttunement;
    result.hasCharges = input.hasCharges;

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
    let result = new HomebrewMonsterData();
    HomebrewData.copyHomebrewBaseData(HomebrewData.parseHomebrewData(input),result);

    result.creatureType = parseEnum(input.creatureType,CreatureType);
    result.challengeRating = input.challengeRating;
    result.armorClass = input.armorClass;
    result.hitpoints = input.hitpoints;
    result.size = parseEnum(input.size,SizeClass);
    result.specialSenses = (input.specialSenses as unknown[]).map(key=>parseEnum(key,SpecialSense));
    result.saveProficiencies = (input.saveProficiencies as unknown[]).map(key=>parseEnum(key,StatType));
    result.skillProficiencies = (input.skillProficiencies as unknown[]).map(key=>parseEnum(key,SkillType));
    result.conditionImmunities = (input.conditionImmunities as unknown[]).map(key=>parseEnum(key,ConditionType));
    result.vulnerabilities = (input.vulnerabilities as unknown[]).map(key=>parseEnum(key,DamageType));
    result.resistances = (input.resistances as unknown[]).map(key=>parseEnum(key,DamageType));
    result.damageImmunities = (input.damageImmunities as unknown[]).map(key=>parseEnum(key,DamageType));
    result.legendary = input.legendary;
    result.mythic = input.mythic;
    result.hasLair = input.hasLair;
    result.movementTypes = (input.movementTypes as unknown[]).map(key=>parseEnum(key,MovementTypes));

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
    let result = new HomebrewSpellData();
    HomebrewData.copyHomebrewBaseData(HomebrewData.parseHomebrewData(input),result);

    result.spellLevel = parseEnum(input.spellLevel,SpellLevel);
    result.school = parseEnum(input.school,SpellSchool);
    result.saveTypes = (input.saveTypes as unknown[]).map(key=>parseEnum(key,StatType));
    result.damageTypes = (input.damageTypes as unknown[]).map(key=>parseEnum(key,DamageType));
    result.conditions = (input.conditions as unknown[]).map(key=>parseEnum(key,ConditionType));
    result.components = (input.components as unknown[]).map(key=>parseEnum(key,SpellComponents));
    result.concentration = input.concentration;
    result.ritual = input.ritual;

    return result;
  }
}
