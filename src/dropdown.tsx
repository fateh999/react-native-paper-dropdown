import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { Menu, TextInput, TouchableRipple } from 'react-native-paper';
import DropdownItem from './dropdown-item';
import DropdownInput from './dropdown-input';
import { DropdownProps, DropdownRef } from './types';
import useDropdown from './use-dropdown';
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import DropdownHeader from './dropdown-header';

function Dropdown(props: DropdownProps, ref: React.Ref<DropdownRef>) {
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
    maxMenuHeight,
    menuContentStyle,
    scrollViewStyle,
    statusBarHeight = Platform.OS === 'android'
      ? StatusBar.currentHeight
      : undefined,
    hideMenuHeader = false,
    Touchable = TouchableRipple,
    disabled = false,
    error = false,
    onSelect,
    CustomDropdownItem = DropdownItem,
    CustomDropdownInput = DropdownInput,
    CustomMenuHeader = DropdownHeader,
  } = props;
  const selectedLabel = options.find((option) => option.value === value)?.label;
  const {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    dropdownLayout,
  } = useDropdown(maxMenuHeight);
  const rightIcon = enable ? menuUpIcon : menuDownIcon;
  const contentStyle = useMemo(() => ({ paddingVertical: 0 }), []);

  useImperativeHandle(ref, () => ({
    focus() {
      setEnable(true);
    },
    blur() {
      setEnable(false);
    },
  }));

  const resetMenu = useCallback(() => {
    onSelect?.(undefined);
    toggleMenu();
  }, [onSelect, toggleMenu]);

  return (
    <Menu
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
            <CustomDropdownInput
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
      contentStyle={[contentStyle, menuContentStyle]}
      testID={menuTestID}
    >
      {!hideMenuHeader && (
        <CustomMenuHeader
          label={label}
          toggleMenu={toggleMenu}
          resetMenu={resetMenu}
          value={value}
          multiSelect={false}
        />
      )}
      <ScrollView style={scrollViewStyle} bounces={false}>
        {options.map((option, index) => {
          return (
            <CustomDropdownItem
              key={option.value}
              option={option}
              value={value}
              width={dropdownLayout.width}
              toggleMenu={toggleMenu}
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

export default forwardRef(Dropdown);
