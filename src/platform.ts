import type { ComponentType } from 'react';
import { Platform } from 'react-native';

type Interpolation =
  | ((executionContext: Object) => Interpolation)
  | string
  | ComponentType
  | Array<Interpolation>;
type RuleSet = Array<Interpolation>;

export interface PlatformSelectObject {
  ios?: RuleSet;
  android?: RuleSet;
  macos?: RuleSet;
  windows?: RuleSet;
  web?: RuleSet;
}

export type PlatformKey = 'android' | 'ios';

const currentPlatform = Platform.OS;
const platformKeys: PlatformKey[] = ['android', 'ios'];

function _platform_main(platformSelectObjectOrPlatformKeyString: PlatformSelectObject | PlatformKey, styles: RuleSet = []): RuleSet {
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
}

interface platform {
  (platformSelectObjectOrPlatformKeyString: PlatformSelectObject | PlatformKey, styles?: RuleSet): RuleSet;
  android: (styles?: RuleSet) => RuleSet | void;
}

const platformGenerator = (() => {
  const platformSolution: any = _platform_main;
  platformSolution.android = (styles: RuleSet) => styles;
  return _platform_main;
})();

export const platform = platformGenerator as platform;
