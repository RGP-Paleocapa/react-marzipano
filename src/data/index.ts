// src/data/index.ts
import config from './config.json';
import { AppData } from './types';
export const APP_DATA = config as AppData;

export type * from './types';
