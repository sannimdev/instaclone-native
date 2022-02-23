# README

## 13.6

```
expo install expo-app-loading
expo install expo-font
```

## 13.7

```
expo install expo-asset
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context

```

## 14.1

```json
Object {
  "navigation": Object {
    "addListener": [Function addListener],
    "canGoBack": [Function canGoBack],
    "dispatch": [Function dispatch],
    "getParent": [Function getParent],
    "replace": [Function anonymous],
    "reset": [Function anonymous],
    "setOptions": [Function setOptions],
    "setParams": [Function anonymous],
  },
  "route": Object {
    "key": "Welcome-1_kTw1O_fii23bcDyW_3x",
    "name": "Welcome",
    "params": undefined,
  },
}
```

## 14.2

```
npm install @react-navigation/native
```

## 14.3

```
npm install styled-components
```

-   react-native-appearnce 패키지는 SDK 43의 EXPO SDK에서 제거되었으므로 다음과 같이 사용한다.

    ```js
    import { Appearance } from 'react-native';
    ```

-   [react-native-appearance](https://docs.expo.dev/versions/v41.0.0/sdk/appearance/)
    Example app.json configuration
    ```json
    {
        "expo": {
            "userInterfaceStyle": "automatic",
            "ios": {
                "userInterfaceStyle": "light"
            },
            "android": {
                "userInterfaceStyle": "dark"
            }
        }
    }
    ```

## 14.9

```
npm install react-hook-form
```

## 14.10

```
npm i @apollo/client graphql
```

## 14.13

-   [Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)

```
 npm i @react-navigation/bottom-tabs
```

## 14.14

-   [AsyncStorage](https://github.com/react-native-async-storage/async-storage)

```
expo install @react-native-async-storage/async-storage
```

## 15.10 Infinite Scrolling part One

-   onEndReached: 사용자가 스크롤의 마지막에 도달했다고 react native가 인지
-
