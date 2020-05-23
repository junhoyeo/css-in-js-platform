# 🛫 css-in-js-platform

## 📦 Installation

```bash
npm install css-in-js-platform
# Or with yarn
yarn add css-in-js-platform
```

## 🚀 Usage
You can use this module in 3 different ways.

```tsx
import platform from 'css-in-js-platform';

const exampleText = styled.Text`
  ${platform({
    ios: css`
      font-size: 14px;
    `,
    android: css`
      font-size: 12px;
    `,
  })}
`;
```

```tsx
import platform from 'css-in-js-platform';

const exampleText = styled.Text`
  font-size: 14px;

  ${platform('android', css`
    font-size: 14px;
  `)}
`;
```

```tsx
import platform from 'css-in-js-platform';

const exampleText = styled.Text`
  font-size: 14px;

  ${platform.android(css`
    font-size: 14px;
  `)}
`;
```

- The platform keys can be one of `'ios' | 'android' | 'macos' | 'windows' | 'web'`, which is from `PlatformOSType` of `react-native`([here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/index.d.ts#L5755)).
