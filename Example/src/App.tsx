import {
  Appbar,
  Provider,
  Surface,
  ThemeProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import DropDown from 'react-native-paper-dropdown';

function App() {
  const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState<string>('');
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [colors, setColors] = useState<string>('');
  const genderList = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Others',
      value: 'others',
    },
  ];
  const colorList = [
    {
      label: 'White',
      value: 'white',
    },
    {
      label: 'Red',
      value: 'red',
    },
    {
      label: 'Blue',
      value: 'blue',
    },
    {
      label: 'Green',
      value: 'green',
    },
    {
      label: 'Orange',
      value: 'orange',
    },
  ];

  return (
    <Provider theme={nightMode ? MD3DarkTheme : MD3LightTheme}>
      <ThemeProvider theme={nightMode ? MD3DarkTheme : MD3LightTheme}>
        <StatusBar
          backgroundColor={
            nightMode ? MD3DarkTheme.colors.surface : MD3LightTheme.colors.primary
          }
          barStyle={'light-content'}
        />
        <Appbar.Header>
          <Appbar.Content title="React Native Paper Dropdown" />
          <Appbar.Action
            icon={nightMode ? 'brightness-7' : 'brightness-3'}
            onPress={() => setNightmode(!nightMode)}
          />
        </Appbar.Header>
        <Surface style={styles.containerStyle}>
          <SafeAreaView style={styles.safeContainerStyle}>
            <DropDown
              label={'Gender'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender}
              setValue={setGender}
              list={genderList}
            />
            <View style={styles.spacerStyle} />
            <DropDown
              label={'Colors'}
              mode={'outlined'}
              visible={showMultiSelectDropDown}
              showDropDown={() => setShowMultiSelectDropDown(true)}
              onDismiss={() => setShowMultiSelectDropDown(false)}
              value={colors}
              setValue={setColors}
              list={colorList}
              multiSelect
            />
          </SafeAreaView>
        </Surface>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
});

export default App;
