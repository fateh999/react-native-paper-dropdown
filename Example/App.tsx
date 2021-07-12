import {
  Appbar,
  DarkTheme,
  Provider,
  Surface,
  TextInput,
} from 'react-native-paper';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import DropDown from 'react-native-paper-dropdown';

function App() {
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
    <Provider theme={DarkTheme}>
      <StatusBar barStyle={'light-content'} />
      <Appbar.Header>
        <Appbar.Content title={'DropDown Demo'} />
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
