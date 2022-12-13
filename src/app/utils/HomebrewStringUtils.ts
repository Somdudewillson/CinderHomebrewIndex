const EditDistance = require('edit-distance');

const insertCost = function (_: string) {
  return 0.8;
};
const removeCost = function (_: string) {
  return 1;
};
const updateCost = function (stringA: string, stringB: string) {
  return stringA !== stringB ? 0.92 : 0;
};

export function computeStringSimilarity(a: string, b: string): number {
  return EditDistance.levenshtein(a, b, insertCost, removeCost, updateCost)
    .distance;
}

export function toTitleCase(inString: string): string {
  return inString.replace(/\b\S/g, function (t) {
    return t.toUpperCase();
  });
}
const SHORT_PROPOSITIONS = new Set<string>([
  'a',
  'an',
  'as',
  'at',
  'but',
  'by',
  'for',
  'in',
  'mid',
  'of',
  'off',
  'on',
  'out',
  'per',
  'pro',
  'qua',
  'to',
  'up',
  'via',
]);
export function formatEnumName(inString: string) {
  return inString
    .split('_')
    .map((str) => str.toLowerCase())
    .map((str) => (SHORT_PROPOSITIONS.has(str) ? str : toTitleCase(str)))
    .join(' ');
}
