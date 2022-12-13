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
import { HomebrewData, HomebrewItemData } from './HomebrewData';
import { computeStringSimilarity } from '../utils/StringUtils';

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
      return 0xFFFF-data.title.charCodeAt(0);
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
  itemType: ItemType | null = null;
  rarity: ItemRarity | null = null;
  requiresAttunment: boolean | null = false;
  hasCharges: boolean | null = false;

  override filterData(data: HomebrewItemData): boolean {
    if (!(data instanceof HomebrewItemData)) {
      return false;
    }
    console.log('itemFilter')
    return super.filterData(data) &&
      (this.itemType==null || data.itemType == this.itemType) &&
      (this.rarity==null || data.rarity == this.rarity) &&
      (this.requiresAttunment==null || data.requiresAttunment == this.requiresAttunment) &&
      (this.hasCharges==null || data.hasCharges == this.hasCharges);
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
  spellLevel: SpellLevel = SpellLevel.CANTRIP;
  school: SpellSchool = SpellSchool.ABJURATION;
  saveTypes: StatType[] = [];
  damageTypes: DamageType[] = [];
  conditions: ConditionType[] = [];
  components: SpellComponents[] = [];
  concentration: boolean = false;
  ritual: boolean = false;
}
