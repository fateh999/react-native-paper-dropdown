import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { Menu, TextInput, TouchableRipple } from 'react-native-paper';
import DropdownInput from './dropdown-input';
import MultiSelectDropdownItem from './multi-select-dropdown-item';
import { DropdownRef, MultiSelectDropdownProps } from './types';
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
    statusBarHeight = Platform.OS === 'android'
      ? StatusBar.currentHeight
      : undefined,
    hideMenuHeader = false,
    Touchable = TouchableRipple,
    disabled = false,
    error = false,
    onSelect,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
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
    scrollViewStyle,
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
      <ScrollView
        style={scrollViewStyle}
        bounces={false}
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
      >
        {options.map((option, index) => {
          return (
            <CustomMultiSelectDropdownItem
              key={option.value}
              option={option}
              value={value}
              width={dropdownLayout.width}
              onSelect={onSelect}
              isLast={options.length <= index + 1}
              menuItemTestID={menuTestID ? `${menuTestID}-${option.value}` : ''}
            />
          );
        })}
      </ScrollView>
    </Menu>
  );
}

export default forwardRef(MultiSelectDropdown);
