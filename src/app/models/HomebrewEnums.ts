export enum HomebrewType {
  CLASS,
  RACE,
  SPELL,
  ITEM,
  MONSTER,
}

export enum ItemType {
  ARMOR,
  POTION,
  RING,
  ROD,
  SCROLL,
  STAFF,
  WAND,
  WEAPON,
  WONDEROUS_ITEM,
}

export enum ItemRarity {
  COMMON,
  UNCOMMON,
  RARE,
  VERY_RARE,
  LEGENDARY,
  ARTIFACT,
}

export enum CreatureType {
  ABERRATION,
  BEAST,
  CELESTIAL,
  CONSTRUCT,
  DRAGON,
  ELEMENTAL,
  FEY,
  FIEND,
  GIANT,
  HUMANOID,
  MONSTROSITY,
  OOZE,
  PLANT,
  UNDEAD,
}

export enum SizeClass {
  TINY,
  SMALL,
  MEDIUM,
  LARGE,
  HUGE,
  GARGANTUAN,
}

export enum SpecialSense {
  BLINDSIGHT,
  DARKVISION,
  TREMORSENSE,
  TRUESIGHT,
}

export enum StatType {
  STRENGTH,
  DEXTERITY,
  CONSTITUTION,
  INTELLIGENCE,
  WISDOM,
  CHARISMA,
}

export enum SkillType {
  ATHLETICS,
  ACROBATICS,
  SLIGHT_OF_HAND,
  STEALTH,
  ARCANA,
  HISTORY,
  INVESTIGATION,
  NATURE,
  RELIGION,
  ANIMAL_HANDLING,
  INSIGHT,
  MEDICINE,
  PERCEPTION,
  SURVIVAL,
  DECEPTION,
  INTIMIDATION,
  PERFORMANCE,
  PERSUASION,
}

export enum ConditionType {
  BLINDED,
  CHARMED,
  DEAFENED,
  EXHAUSTION,
  FRIGHTENED,
  GRAPPLED,
  INCAPACITATED,
  INVISIBLE,
  PARALYZED,
  PETRIFIED,
  POISONED,
  PRONE,
  RESTRAINED,
  STUNNED,
  UNCONSCIOUS,
}

export enum DamageType {
  ACID,
  BLUDGEONING,
  COLD,
  FIRE,
  FORCE,
  LIGHTNING,
  NECROTIC,
  PIERCING,
  POISON,
  PSYCHIC,
  RADIANT,
  SLASHING,
  THUNDER,
}

export enum MovementTypes {
  WALK,
  BURROW,
  CLIMB,
  FLY,
  SWIM,
}

export enum SpellLevel {
	CANTRIP,
	FIRST,
	SECOND,
	THIRD,
	FOURTH,
	FIFTH,
	SIXTH,
	SEVENTH,
	EIGHTH,
	NINTH,
	TENTH
}

export enum SpellSchool {
	ABJURATION,
	CONJURATION,
	DIVINATION,
	ENCHANTMENT,
	EVOCATION,
	ILLUSION,
	NECROMANCY,
	TRANSMUTATION
}

export enum SpellComponents {
	VERBAL,
	SOMATIC,
	MATERIAL,
	CONSUMES_MATERIAL
}

const SHORT_PROPOSITIONS = new Set<string>(["a","an","as","at","but","by","for","in","mid","of","off","on","out","per","pro","qua","to","up","via"]);
export function formatEnumName(inString: string) {
  return inString.split("_")
    .map(str=>str.toLowerCase())
    .map(str=>SHORT_PROPOSITIONS.has(str)?str:str.replace(/\b\S/g, function(t) { return t.toUpperCase(); }))
    .join(" ");
}
