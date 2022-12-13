const EditDistance = require('edit-distance');

const insertCost = function (_: string) {
  return 1;
};
const removeCost = function (_: string) {
  return 1.25;
};
const updateCost = function (stringA: string, stringB: string) {
  return stringA !== stringB ? 1.15 : 0;
};

export function computeStringSimilarity(a: string, b: string): number {
  return EditDistance.levenshtein(a, b, insertCost, removeCost, updateCost)
    .distance;
}
