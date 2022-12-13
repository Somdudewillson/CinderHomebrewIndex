import { HomebrewSearchData } from "./HomebrewSearchData";

export interface IHomebrewSearchExpander<E extends HomebrewSearchData> {
    extendSearchData(baseData: HomebrewSearchData): E;
}
