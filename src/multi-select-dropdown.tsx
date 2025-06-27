import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { FlatList, Platform, ScrollView, StatusBar, View } from 'react-native';
import { Menu, TextInput, TouchableRipple } from 'react-native-paper';
import DropdownInput from './dropdown-input';
import MultiSelectDropdownItem from './multi-select-dropdown-item';
import { DropdownRef, MultiSelectDropdownProps, Option } from './types';
import useDropdown from './use-dropdown';
import DropdownHeader from './dropdown-header';

function MultiSelectDropdown(
  props: MultiSelectDropdownProps,
  ref: React.Ref<DropdownRef>
) {
  const {
    testID,
    menuTestID,
    options,
    mode,
    placeholder,
    label,
    menuUpIcon = <TextInput.Icon icon={'menu-up'} pointerEvents="none" />,
    menuDownIcon = <TextInput.Icon icon={'menu-down'} pointerEvents="none" />,
    value,
    menuContentStyle = { paddingVertical: 0 },
    maxMenuHeight,
    listContainerStyle,
    statusBarHeight = Platform.OS === 'android'
      ? StatusBar.currentHeight
      : undefined,
    hideMenuHeader = false,
    isFlatList = false,
    flatListProps,
    scrollViewProps,
    Touchable = TouchableRipple,
    disabled = false,
    error = false,
    onSelect,
    CustomMultiSelectDropdownItem = MultiSelectDropdownItem,
    CustomMultiSelectDropdownInput = DropdownInput,
    CustomMenuHeader = DropdownHeader,
  } = props;

  const selectedLabel = useMemo(
    () =>
      options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label)
        .join(', '),
    [options, value]
  );
  const {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    defaultListStyle,
    dropdownLayout,
  } = useDropdown(maxMenuHeight);
  const rightIcon = enable ? menuUpIcon : menuDownIcon;

  useImperativeHandle(ref, () => ({
    focus() {
      setEnable(true);
    },
    blur() {
      setEnable(false);
    },
  }));

  const resetMenu = useCallback(() => {
    onSelect?.([]);
    toggleMenu();
  }, [onSelect, toggleMenu]);

  const renderMultiSelectDropdownItem = useCallback(
    (option: Option, index: number) => (
      <CustomMultiSelectDropdownItem
        key={option.value}
        option={option}
        value={value}
        width={dropdownLayout.width}
        onSelect={onSelect}
        isLast={options.length <= index + 1}
        menuItemTestID={menuTestID ? `${menuTestID}-${option.value}` : ''}
      />
    ),
    [
      value,
      dropdownLayout.width,
      onSelect,
      options,
      menuTestID,
      CustomMultiSelectDropdownItem,
    ]
  );

  return (
    <Menu
      testID={menuTestID}
      visible={enable}
      onDismiss={toggleMenu}
      style={menuStyle}
      elevation={5}
      statusBarHeight={statusBarHeight}
      keyboardShouldPersistTaps={'handled'}
      anchor={
        <Touchable
          testID={testID}
          disabled={disabled}
          onPress={toggleMenu}
          onLayout={onLayout}
        >
          <View pointerEvents="none">
            <CustomMultiSelectDropdownInput
              placeholder={placeholder}
              label={label}
              rightIcon={rightIcon}
              selectedLabel={selectedLabel}
              mode={mode}
              disabled={disabled}
              error={error}
            />
          </View>
        </Touchable>
      }
      contentStyle={menuContentStyle}
    >
      {!hideMenuHeader && (
        <CustomMenuHeader
          label={label}
          toggleMenu={toggleMenu}
          resetMenu={resetMenu}
          value={value}
          multiSelect
        />
      )}
      {isFlatList ? (
        <FlatList
          data={options}
          bounces={false}
          renderItem={({ item: option, index }) =>
            renderMultiSelectDropdownItem(option, index)
          }
          keyExtractor={(item) => item.value}
          style={[defaultListStyle, listContainerStyle]}
          {...flatListProps}
        />
      ) : (
        <ScrollView
          style={[defaultListStyle, listContainerStyle]}
          bounces={false}
          {...scrollViewProps}
        >
          {options.map((option, index) =>
            renderMultiSelectDropdownItem(option, index)
          )}
        </ScrollView>
      )}
    </Menu>
  );
}

export default forwardRef(MultiSelectDropdown);
