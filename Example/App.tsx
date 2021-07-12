import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  TextInput,
  ThemeProvider,
} from 'react-native-paper';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import DropDown from 'react-native-paper-dropdown';

function App() {
  const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender]: [
    string | number | undefined,
    Dispatch<SetStateAction<string | number | undefined>>,
  ] = useState();
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

  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <StatusBar
          backgroundColor={
            nightMode ? DarkTheme.colors.surface : DefaultTheme.colors.primary
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
              inputProps={{
                right: <TextInput.Icon name={'menu-down'} />,
              }}
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
  safeContainerStyle: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default App;
