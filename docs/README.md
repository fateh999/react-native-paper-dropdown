# react-native-paper-dropdown

[![npm version](https://img.shields.io/npm/v/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm downloads](https://img.shields.io/npm/dm/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm](https://img.shields.io/npm/dt/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm](https://img.shields.io/npm/l/react-native-paper-dropdown?style=for-the-badge)](https://github.com/fateh999/react-native-paper-dropdown/blob/master/LICENSE)

A Material Design Dropdown Component for React Native Paper

## Installation

To install the package, run:

```bash
yarn add react-native-paper-dropdown
```

or

```bash
npm i react-native-paper-dropdown
```

## Dependencies

This package depends on `react-native-paper`. Ensure it's installed in your project:

```bash
yarn add react-native-paper
```

## Basic Example

### Single Select

```javascript
import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';

const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export default function App() {
  const [gender, setGender] = useState<string>();

  return (
    <PaperProvider>
      <View style={{ margin: 16 }}>
        <Dropdown
          label="Gender"
          placeholder="Select Gender"
          options={OPTIONS}
          value={gender}
          onSelect={setGender}
        />
      </View>
    </PaperProvider>
  );
}
```

### Multi Select

```javascript
import React, { useState } from 'react';
import { View } from 'react-native';
import { MultiSelectDropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';

const MULTI_SELECT_OPTIONS = [
  { label: 'White', value: 'white' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Orange', value: 'orange' },
];

export default function App() {
  const [colors, setColors] = useState<string[]>([]);

  return (
    <PaperProvider>
      <View style={{ margin: 16 }}>
        <MultiSelectDropdown
          label="Colors"
          placeholder="Select Colors"
          options={MULTI_SELECT_OPTIONS}
          value={colors}
          onSelect={setColors}
        />
      </View>
    </PaperProvider>
  );
}
```

## Advanced Example

```javascript
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import {
  Appbar,
  Divider,
  Headline,
  PaperProvider,
  Paragraph,
  TextInput,
  ThemeProvider,
  TouchableRipple,
} from 'react-native-paper';
import {
  Dropdown,
  MultiSelectDropdown,
  DropdownInputProps,
  DropdownItemProps,
} from 'react-native-paper-dropdown';

const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const MULTI_SELECT_OPTIONS = [
  { label: 'White', value: 'white' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Orange', value: 'orange' },
];

const CustomDropdownItem = ({
  width,
  option,
  value,
  onSelect,
  toggleMenu,
  isLast,
}: DropdownItemProps) => {
  const style: ViewStyle = useMemo(
    () => ({
      height: 50,
      width,
      backgroundColor:
        value === option.value ? MD3DarkTheme.colors.primary : MD3DarkTheme.colors.onPrimary,
      justifyContent: 'center',
      paddingHorizontal: 16,
    }),
    [option.value, value, width]
  );

  return (
    <>
      <TouchableRipple
        onPress={() => {
          onSelect?.(option.value);
          toggleMenu();
        }}
        style={style}
      >
        <Headline
          style={{
            color: value === option.value ? MD3DarkTheme.colors.onPrimary : MD3DarkTheme.colors.primary,
          }}
        >
          {option.label}
        </Headline>
      </TouchableRipple>
      {!isLast && <Divider />}
    </>
  );
};

const CustomDropdownInput = ({
  placeholder,
  selectedLabel,
  rightIcon,
}: DropdownInputProps) => (
  <TextInput
    mode="outlined"
    placeholder={placeholder}
    placeholderTextColor={MD3DarkTheme.colors.onSecondary}
    value={selectedLabel}
    style={{ backgroundColor: MD3DarkTheme.colors.primary }}
    textColor={MD3DarkTheme.colors.onPrimary}
    right={rightIcon}
  />
);

export default function App() {
  const [nightMode, setNightMode] = useState(false);
  const [gender, setGender] = useState<string>();
  const [colors, setColors] = useState<string[]>([]);
  const Theme = nightMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeProvider theme={Theme}>
      <PaperProvider theme={Theme}>
        <View style={[styles.container, { backgroundColor: Theme.colors.background }]}>
          <Appbar.Header elevated>
            <Appbar.Content title="Dropdown Demo" />
            <Appbar.Action
              icon={nightMode ? 'brightness-7' : 'brightness-3'}
              onPress={() => setNightMode(!nightMode)}
            />
          </Appbar.Header>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.formWrapper}>
              <Headline>Single Select</Headline>
              <Paragraph>Default Dropdown</Paragraph>
              <Dropdown
                label="Gender"
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
              />
              <Paragraph>Default Dropdown (Outline Mode)</Paragraph>
              <Dropdown
                label="Gender"
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
                mode="outlined"
              />
              <Paragraph>Custom Dropdown</Paragraph>
              <Dropdown
                label="Gender"
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
                menuContentStyle={{ backgroundColor: MD3DarkTheme.colors.onPrimary }}
                menuUpIcon={<TextInput.Icon icon="menu-up" color={MD3DarkTheme.colors.primaryContainer} pointerEvents="none" />}
                menuDownIcon={<TextInput.Icon icon="menu-down" color={MD3DarkTheme.colors.primaryContainer} pointerEvents="none" />}
                CustomDropdownItem={CustomDropdownItem}
                CustomDropdownInput={CustomDropdownInput}
              />

              <Headline>Multi Select</Headline>
              <Paragraph>Default Dropdown</Paragraph>
              <MultiSelectDropdown
                label="Colors"
                placeholder="Select Colors"
                options={MULTI_SELECT_OPTIONS}
                value={colors}
                onSelect={setColors}
              />
              <Paragraph>Default Dropdown (Outline Mode)</Paragraph>
              <MultiSelectDropdown
                label="Colors"
                placeholder="Select Colors"
                options={MULTI_SELECT_OPTIONS}
                value={colors}
                onSelect={setColors}
                mode="outlined"
              />
            </View>
          </ScrollView>
        </View>
      </PaperProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    margin: 16,
  },
});
```

## Demo

<img src="https://github.com/fateh999/react-native-paper-dropdown/raw/main/Demo.gif" style="object-fit:contain" width="250" height="444"/>

## Props

### `DropdownProps`

| Prop                  | Type                                                                    | Description                                                      |
| --------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `testID`              | `string`                                                                | Test ID for the dropdown component.                              |
| `menuTestID`          | `string`                                                                | Test ID for the dropdown menu.                                   |
| `value`               | `string`                                                                | The currently selected value.                                    |
| `onSelect`            | `(value: string) => void`                                               | Callback function to handle value selection.                     |
| `options`             | `Option[]`                                                              | Array of options for the dropdown.                               |
| `menuUpIcon`          | `JSX.Element`                                                           | Custom icon for menu up state.                                   |
| `menuDownIcon`        | `JSX.Element`                                                           | Custom icon for menu down state.                                 |
| `maxMenuHeight`       | `number`                                                                | Maximum height of the dropdown menu.                             |
| `menuContentStyle`    | `ViewStyle`                                                             | Style for the dropdown menu content.                             |
| `listContainerStyle`  | `StyleProp<ViewStyle>`                                                  | Style for the list container (FlatList/ScrollView).              |
| `isFlatList`          | `boolean`                                                               | Whether to use FlatList for rendering (default: false).          |
| `flatListProps`       | `Omit<FlatListProps<Option>, 'data' \| 'renderItem' \| 'keyExtractor'>` | Additional props for FlatList (only when isFlatList is true).    |
| `scrollViewProps`     | `ScrollViewProps`                                                       | Additional props for ScrollView (only when isFlatList is false). |
| `CustomDropdownItem`  | `(props: DropdownItemProps) => JSX.Element`                             | Custom component for dropdown item.                              |
| `CustomDropdownInput` | `(props: DropdownInputProps) => JSX.Element`                            | Custom component for dropdown input.                             |
| `CustomMenuHeader`    | `(props: DropdownHeaderProps) => JSX.Element`                           | Custom component for the dropdown menu header.                   |
| `Touchable`           | `ForwardRefExoticComponent<PressableProps & RefAttributes<View>>`       | Custom touchable component for the dropdown.                     |
| `placeholder`         | `string`                                                                | Placeholder text for the dropdown input.                         |
| `label`               | `TextInputLabelProp`                                                    | Label for the dropdown input.                                    |
| `mode`                | `'flat' \| 'outlined'`                                                  | Mode for the dropdown input.                                     |
| `disabled`            | `boolean`                                                               | Whether the dropdown is disabled.                                |
| `error`               | `boolean`                                                               | Whether the dropdown has an error.                               |
| `hideMenuHeader`      | `boolean`                                                               | Hide menu header component (default: false).                     |
| `statusBarHeight`     | `number`                                                                | Additional top margin for the status bar on Android.             |

### `MultiSelectDropdownProps`

| Prop                             | Type                                                                    | Description                                                      |
| -------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `testID`                         | `string`                                                                | Test ID for the dropdown component.                              |
| `menuTestID`                     | `string`                                                                | Test ID for the dropdown menu.                                   |
| `value`                          | `string[]`                                                              | The currently selected values.                                   |
| `onSelect`                       | `(value: string[]) => void`                                             | Callback function to handle value selection.                     |
| `options`                        | `Option[]`                                                              | Array of options for the dropdown.                               |
| `menuUpIcon`                     | `JSX.Element`                                                           | Custom icon for menu up state.                                   |
| `menuDownIcon`                   | `JSX.Element`                                                           | Custom icon for menu down state.                                 |
| `Touchable`                      | `ForwardRefExoticComponent<PressableProps & RefAttributes<View>>`       | Custom touchable component for the dropdown.                     |
| `maxMenuHeight`                  | `number`                                                                | Maximum height of the dropdown menu.                             |
| `menuContentStyle`               | `ViewStyle`                                                             | Style for the dropdown menu content.                             |
| `listContainerStyle`             | `StyleProp<ViewStyle>`                                                  | Style for the list container (FlatList/ScrollView).              |
| `isFlatList`                     | `boolean`                                                               | Whether to use FlatList for rendering (default: false).          |
| `flatListProps`                  | `Omit<FlatListProps<Option>, 'data' \| 'renderItem' \| 'keyExtractor'>` | Additional props for FlatList (only when isFlatList is true).    |
| `scrollViewProps`                | `ScrollViewProps`                                                       | Additional props for ScrollView (only when isFlatList is false). |
| `CustomMultiSelectDropdownItem`  | `(props: MultiSelectDropdownItemProps) => JSX.Element`                  | Custom component for multi-select dropdown item.                 |
| `CustomMultiSelectDropdownInput` | `(props: DropdownInputProps) => JSX.Element`                            | Custom component for multi-select dropdown input.                |
| `CustomMenuHeader`               | `(props: DropdownHeaderProps) => JSX.Element`                           | Custom component for the dropdown menu header.                   |
| `placeholder`                    | `string`                                                                | Placeholder text for the dropdown input.                         |
| `label`                          | `TextInputLabelProp`                                                    | Label for the dropdown input.                                    |
| `mode`                           | `'flat' \| 'outlined'`                                                  | Mode for the dropdown input.                                     |
| `disabled`                       | `boolean`                                                               | Whether the dropdown is disabled.                                |
| `error`                          | `boolean`                                                               | Whether the dropdown has an error.                               |
| `hideMenuHeader`                 | `boolean`                                                               | Hide menu header component (default: false).                     |
| `statusBarHeight`                | `number`                                                                | Additional top margin for the status bar on Android.             |

## Methods

| Method    | Return | Description                  |
| --------- | ------ | ---------------------------- |
| `focus()` | `void` | Open the dropdown manually.  |
| `blur()`  | `void` | Close the dropdown manually. |

## Customization

You can customize the appearance and behavior of the dropdowns by using the provided props like `menuUpIcon`, `menuDownIcon`, `CustomDropdownItem`, `CustomDropdownInput`, and `menuContentStyle`.

Enjoy using `react-native-paper-dropdown`!
