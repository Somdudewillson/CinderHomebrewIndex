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
} from './HomebrewEnums';
import { HomebrewData, HomebrewItemData, HomebrewSpellData } from './HomebrewData';
import { computeStringSimilarity } from '../utils/HomebrewStringUtils';

export class HomebrewSearchData {
  type: HomebrewType | null = null;
  searchString: string = '';
  tags: string[] = [];

  public static copyHomebrewSearchData(source: HomebrewSearchData, target: HomebrewSearchData) {
    target.type = source.type;
    target.searchString = source.searchString;
    target.tags = source.tags;
  }

  public scoreDataMatch(data: HomebrewData): number {
    if (!this.filterData(data)) {
      return 0;
    }

    if (this.searchString.trim().length==0) {
      let lexScore = 0;
      for (const char of data.title) {
        lexScore *= 10;
        lexScore += (0xFFFF-char.charCodeAt(0)/65535)
      }
      return lexScore/(10**data.title.length);
    }

    let score = 0;
    const keywords = this.searchString.trim().split(' ');

    score +=
      HomebrewSearchData.keywordScore(keywords, data.author.split(' ')) * 2;
    score +=
      HomebrewSearchData.keywordScore(keywords, data.title.split(' ')) * 2;
    score +=
      HomebrewSearchData.keywordScore(
        keywords,
        data.content.flatMap((line) => line.split(' '))
      ) * 0.8;

    return score;
  }

  filterData(data: HomebrewData): boolean {
    return this.type == null || data.type == this.type;
  }

  static keywordScore(
    searchKeywords: string[],
    testKeywords: string[],
    weightFunc = (a: number, b: number) => (a + b + Math.min(a, b) * 2) / 3,
    scoreFunc = (score: number) => score
  ) {
    let score = testKeywords
      .flatMap((testKeyword) =>
        searchKeywords
          .map(
            (keyword) =>
              computeStringSimilarity(keyword, testKeyword) /
              Math.max(keyword.length, testKeyword.length)
          )
          .map(scoreFunc)
          .map((score) => 1 - score)
      )
      .reduce(weightFunc);
    return score / (searchKeywords.length * testKeywords.length);
  }
}

export class HomebrewItemSearchData extends HomebrewSearchData {
  itemType: ItemType[] | null = null;
  rarity: ItemRarity[] | null = null;
  requiresAttunement: boolean | null = false;
  hasCharges: boolean | null = false;

  override filterData(data: HomebrewItemData): boolean {
    if (!(data instanceof HomebrewItemData)) {
      return false;
    }

    return super.filterData(data) &&
      (this.requiresAttunement==null || data.requiresAttunement == this.requiresAttunement) &&
      (this.hasCharges==null || data.hasCharges == this.hasCharges) &&
      (this.itemType==null || this.itemType.includes(data.itemType)) &&
      (this.rarity==null || this.rarity.includes(data.rarity));
  }
}

export class HomebrewMonsterSearchData extends HomebrewSearchData {
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
}

export class HomebrewSpellSearchData extends HomebrewSearchData {
  spellLevel: SpellLevel[] | null = null;
  school: SpellSchool[] | null = null;
  saveTypes: StatType[] = [];// all-of
  damageTypes: DamageType[] = [];// all-of
  conditions: ConditionType[] = [];// all-of
  components: SpellComponents[] = [];// all-of
  concentration: boolean | null = false;
  ritual: boolean | null = false;

  override filterData(data: HomebrewSpellData): boolean {
    if (!(data instanceof HomebrewSpellData)) {
      return false;
    }

    return super.filterData(data) &&
      (this.concentration==null || data.concentration == this.concentration) &&
      (this.ritual==null || data.ritual == this.ritual) &&
      (this.spellLevel==null || this.spellLevel.includes(data.spellLevel)) &&
      (this.school==null || this.school.includes(data.school)) &&
      (this.saveTypes.length==0 || this.saveTypes.every(saveType=>data.saveTypes.includes(saveType))) &&
      (this.damageTypes.length==0 || this.damageTypes.every(damageType=>data.damageTypes.includes(damageType))) &&
      (this.conditions.length==0 || this.conditions.every(condition=>data.conditions.includes(condition))) &&
      (this.components.length==0 || this.components.every(component=>data.components.includes(component)));
  }
}
