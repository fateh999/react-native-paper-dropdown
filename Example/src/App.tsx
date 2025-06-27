import { useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import {
  Appbar,
  Button,
  Divider,
  Headline,
  MD3DarkTheme,
  MD3LightTheme,
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
  DropdownRef,
} from 'react-native-paper-dropdown';

const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const MULTI_SELECT_OPTIONS = [
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
        value === option.value
          ? MD3DarkTheme.colors.primary
          : MD3DarkTheme.colors.onPrimary,
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
            color:
              value === option.value
                ? MD3DarkTheme.colors.onPrimary
                : MD3DarkTheme.colors.primary,
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
}: DropdownInputProps) => {
  return (
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      placeholderTextColor={MD3DarkTheme.colors.onSecondary}
      value={selectedLabel}
      style={{
        backgroundColor: MD3DarkTheme.colors.primary,
      }}
      textColor={MD3DarkTheme.colors.onPrimary}
      right={rightIcon}
    />
  );
};

export default function App() {
  const [nightMode, setNightmode] = useState(false);
  const [gender, setGender] = useState<string>();
  const [colors, setColors] = useState<string[]>([]);
  const refDropdown1 = useRef<DropdownRef>(null);
  const Theme = nightMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeProvider theme={Theme}>
      <PaperProvider theme={Theme}>
        <View
          style={[
            styles.container,
            { backgroundColor: Theme.colors.background },
          ]}
        >
          <Appbar.Header elevated>
            <Appbar.Content title={'Dropdown Demo'} />
            <Appbar.Action
              icon={nightMode ? 'brightness-7' : 'brightness-3'}
              onPress={() => setNightmode(!nightMode)}
            />
          </Appbar.Header>
          <ScrollView
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps={'handled'}
          >
            <View style={styles.formWrapper}>
              <Headline>Single Select</Headline>
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown</Paragraph>
              <Dropdown
                ref={refDropdown1}
                label={'Gender'}
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
              />
              <View style={styles.spacer} />
              <Paragraph>
                Default Dropdown (Outline Mode also FlatList)
              </Paragraph>
              <Dropdown
                label={'Gender'}
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
                mode="outlined"
                isFlatList
              />
              <View style={styles.spacer} />
              <Paragraph>Custom Dropdown</Paragraph>
              <Dropdown
                label={'Gender'}
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
                menuContentStyle={{
                  backgroundColor: MD3DarkTheme.colors.onPrimary,
                }}
                menuUpIcon={
                  <TextInput.Icon
                    icon={'menu-up'}
                    color={MD3DarkTheme.colors.primaryContainer}
                    pointerEvents="none"
                  />
                }
                menuDownIcon={
                  <TextInput.Icon
                    icon={'menu-down'}
                    color={MD3DarkTheme.colors.primaryContainer}
                    pointerEvents="none"
                  />
                }
                CustomDropdownItem={CustomDropdownItem}
                CustomDropdownInput={CustomDropdownInput}
              />

              <View style={styles.spacer} />
              <View style={styles.spacer} />

              <Headline>Multi Select</Headline>
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown</Paragraph>
              <MultiSelectDropdown
                label={'Colors'}
                placeholder="Select Colors"
                options={MULTI_SELECT_OPTIONS}
                value={colors}
                onSelect={setColors}
              />
              <View style={styles.spacer} />
              <Paragraph>
                Default Dropdown (Outline Mode also FlatList)
              </Paragraph>
              <MultiSelectDropdown
                label={'Colors'}
                placeholder="Select Colors"
                options={MULTI_SELECT_OPTIONS}
                value={colors}
                onSelect={setColors}
                mode={'outlined'}
                isFlatList
              />

              <View style={styles.spacer} />
              <View style={styles.spacer} />

              <Headline>Reset</Headline>
              <View style={styles.spacer} />
              <Button
                mode={'contained'}
                onPress={() => {
                  setGender(undefined);
                }}
              >
                Reset
              </Button>

              <View style={styles.spacer} />

              <Headline>References</Headline>
              <View style={styles.spacer} />
              <Button
                mode={'contained'}
                onPress={() => refDropdown1.current?.focus()}
              >
                Focus
              </Button>
              <View style={styles.spacer} />
              <Button
                mode={'contained'}
                onPress={() => refDropdown1.current?.blur()}
              >
                Blur
              </Button>
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
  spacer: {
    height: 16,
  },
});
