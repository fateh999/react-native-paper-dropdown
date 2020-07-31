# react-native-paper-dropdown

[![NPM](https://nodei.co/npm/react-native-paper-dropdown.png?downloads=true)](https://nodei.co/npm/react-native-paper-dropdown/)

Material Design Dropdown Component using React Native Paper

## Basic Example

```javascript
import React from 'react';

import DropDown from 'react-native-paper-dropdown';

function DropDownDemo() {
  const [showDropDown, setShowDropDown] = useState(false);

  const [gender, setGender] = useState();

  const genderList = [
    { label: 'Male', value: 'male' },

    { label: 'Female', value: 'female' },

    { label: 'Others', value: 'others' },
  ];

  <Provider>
    <StatusBar barStyle={'light-content'} />

    <SafeAreaView style={styles.containerStyle}>
      <DropDown
        label={'Gender'}
        mode={'outlined'}
        value={gender}
        setValue={setGender}
        list={genderList}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        inputProps={{
          right: <TextInput.Icon name={'menu-down'} />,
        }}
      />
    </SafeAreaView>
  </Provider>;
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,

    justifyContent: 'center',
  },
});
```

## Props

```typescript
    {
        visible:  boolean;
        onDismiss: () =>  void;
        showDropDown: () =>  void;
        value:  string  |  number  |  undefined;
        setValue: (_value:  string  |  number) =>  void;
        label?:  string  |  undefined;
        placeholder?:  string  |  undefined;
        mode?:  'outlined'  |  'flat'  |  undefined;
        inputProps?:  TextInputPropsWithoutTheme;
        list:  Array<{
                        label: string;
                        value: string | number;
                        custom?:  ReactNode;
                     }>;
        dropDownContainerMaxHeight?:  number;
        activeColor?:  string;
        theme?:  Theme;
    }
```
