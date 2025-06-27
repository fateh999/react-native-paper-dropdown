# react-native-paper-dropdown

[![npm version](https://img.shields.io/npm/v/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm downloads](https://img.shields.io/npm/dm/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm](https://img.shields.io/npm/dt/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm](https://img.shields.io/npm/l/react-native-paper-dropdown?style=for-the-badge)](https://github.com/fateh999/react-native-paper-dropdown/blob/master/LICENSE)

Material Design Dropdown Component using React Native Paper, now also with multiselect

## Dependencies

```bash
react-native-paper
```

## Installation

```bash
yarn add react-native-paper-dropdown
```

or

```bash
npm i react-native-paper-dropdown
```

## Demo

<img src="https://github.com/fateh999/react-native-paper-dropdown/raw/main/Demo.gif" style="object-fit:contain" width="250" height="444"/>

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

## Latest Documentation

- [https://fateh999.github.io/react-native-paper-dropdown](https://fateh999.github.io/react-native-paper-dropdown)

## v1 Documentation

- [https://fateh999.github.io/react-native-paper-dropdown/#/old-version](https://fateh999.github.io/react-native-paper-dropdown/#/old-version)

<p><a href="https://www.buymeacoffee.com/fateh999"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="fateh999" /></a></p><br><br><br>

## License

MIT
