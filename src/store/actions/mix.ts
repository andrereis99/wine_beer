import * as TYPES from '../constants';

export const setTitle = (value: string) => ({ type: TYPES.SET_TITLE, value });
export const setLanguage = (value: string) => ({ type: TYPES.SET_LANGUAGE, value });
export const setBottles = (value: object) => ({ type: TYPES.SET_BOTTLES, value });