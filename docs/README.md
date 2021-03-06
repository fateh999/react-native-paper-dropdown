# react-native-paper-dropdown

[![npm version](https://img.shields.io/npm/v/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm downloads](https://img.shields.io/npm/dm/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm](https://img.shields.io/npm/dt/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm](https://img.shields.io/npm/l/react-native-paper-dropdown?style=for-the-badge)](https://github.com/fateh999/react-native-paper-dropdown/blob/master/LICENSE)

Material Design Dropdown Component using React Native Paper

## Dependencies

    react-native-paper

## Installation

```bash

yarn add react-native-paper-dropdown

```

or

```

npm i react-native-paper-dropdown

```

## Basic Example

```javascript
import { Provider, TextInput } from "react-native-paper";

import React, { useState } from "react";

import { SafeAreaView, StyleSheet } from "react-native";

import DropDown from "react-native-paper-dropdown";

function Example() {
  const [showDropDown, setShowDropDown] = useState(false);

  const [gender, setGender] = useState();

  const genderList = [
    { label: "Male", value: "male" },

    { label: "Female", value: "female" },

    { label: "Others", value: "others" },
  ];

  return (
    <Provider>
      <SafeAreaView style={styles.containerStyle}>
        <DropDown
          label={"Gender"}
          mode={"outlined"}
          value={gender}
          setValue={setGender}
          list={genderList}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          inputProps={{
            right: <TextInput.Icon name={"menu-down"} />,
          }}
        />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,

    marginHorizontal: 20,

    justifyContent: "center",
  },
});

export default Example;
```

## Demo

![Android](https://imgur.com/bsAAVMI.png)

![iOS](https://i.imgur.com/yRBnR80.png)

## Props

```typescript
{
    visible: boolean;
    onDismiss: () => void;
    showDropDown: () => void;
    value: string | number | undefined;
    setValue: (_value: string | number) => void;
    label?: string | undefined;
    placeholder?: string | undefined;
    mode?: "outlined" | "flat" | undefined;
    inputProps?: TextInputPropsWithoutTheme;
    list: Array<{
        label: string;
        value: string | number;
        custom?: ReactNode;
    }>;
    dropDownContainerMaxHeight?: number;
    dropDownContainerHeight?: number;
    activeColor?: string;
    theme?: Theme;
    dropDownStyle?: ViewStyle;
    dropDownItemSelectedTextStyle?: TextStyle;
    dropDownItemSelectedStyle?: ViewStyle;
    dropDownItemStyle?: ViewStyle;
    dropDownItemTextStyle?: TextStyle;
}
```
