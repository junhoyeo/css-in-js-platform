import type { ComponentType } from 'react';
import { Platform } from 'react-native';

type Interpolation =
  | ((executionContext: Object) => Interpolation)
  | string
  | ComponentType
  | Array<Interpolation>;
type RuleSet = Array<Interpolation>;

type PartialRecord<K extends string, T> = {
  [P in K]?: T;
};

const tuple = <T extends string[]>(...args: T) => args;

const currentPlatform = Platform.OS;
const platformKeys = tuple('android', 'ios', 'macos', 'windows', 'web');

export type TPlatformKey = typeof platformKeys[number];
export type TPlatformSelectObject = PartialRecord<string, RuleSet>;
type TPlatformSelectObjectOrPlatformKey = TPlatformSelectObject | TPlatformKey;

export type TPlatformMainHandler =
  (platformSelectObjectOrPlatformKeyString: TPlatformSelectObjectOrPlatformKey, styles?: RuleSet) => RuleSet;
export type TPlatformEachHandler = (styles?: RuleSet) => RuleSet;

export interface IPlatform extends Record<TPlatformKey, TPlatformEachHandler> {
  (platformSelectObjectOrPlatformKeyString: TPlatformSelectObjectOrPlatformKey, styles?: RuleSet): RuleSet;
}

const platformMainHandler: TPlatformMainHandler = (platformSelectObjectOrPlatformKeyString, styles = []) => {
  if (typeof platformSelectObjectOrPlatformKeyString === 'string') {
    return styles;
  }

  const platformSelectObject = platformSelectObjectOrPlatformKeyString;
  platformKeys.map((platformKey) => {
    if (currentPlatform === platformKey && platformKey in platformSelectObject) {
      return platformSelectObject[platformKey];
    }
  });

  return [];
};

class StyledPlatform {
  platform: any;

  constructor() {
    this.initializeMain();
    this.registerPlatformMethods();
  }

  private initializeMain() {
    this.platform = platformMainHandler;
  }

  private registerPlatformMethods() {
    platformKeys.forEach((platformKey: TPlatformKey) =>
      this.platform[platformKey] = (styles: RuleSet) =>
        currentPlatform === platformKey ? styles : []);
  }
}

const styledPlatform = new StyledPlatform();
export const platform = styledPlatform.platform as IPlatform;
