import React, {
  type ReactNode,
  forwardRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from 'react';
import {
  type LayoutChangeEvent,
  ScrollView,
  type TextStyle,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Checkbox,
  Divider,
  Menu,
  TextInput,
  TouchableRipple,
  useTheme,
  type TextInputProps,
  type MD3Theme,
} from 'react-native-paper';

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface DropDownPropsInterface {
  visible: boolean;
  multiSelect?: boolean;
  onDismiss: () => void;
  showDropDown: () => void;
  value: any;
  setValue: (_value: any) => void;
  label?: string | undefined;
  placeholder?: string | undefined;
  mode?: 'outlined' | 'flat' | undefined;
  inputProps?: TextInputPropsWithoutTheme;
  list: Array<{
    label: string;
    value: string | number;
    custom?: ReactNode;
  }>;
  dropDownContainerMaxHeight?: number;
  dropDownContainerHeight?: number;
  activeColor?: string;
  theme?: MD3Theme;
  dropDownStyle?: ViewStyle;
  dropDownItemSelectedTextStyle?: TextStyle;
  dropDownItemSelectedStyle?: ViewStyle;
  dropDownItemStyle?: ViewStyle;
  dropDownItemTextStyle?: TextStyle;
  accessibilityLabel?: string;
}

type TextInputPropsWithoutTheme = Without<TextInputProps, 'theme'>;

const DropDown = forwardRef<TouchableWithoutFeedback, DropDownPropsInterface>(
  (props, ref) => {
    const defTheme = useTheme();
    const {
      multiSelect = false,
      visible,
      onDismiss,
      showDropDown,
      value,
      setValue,
      activeColor,
      mode,
      label,
      placeholder,
      inputProps,
      list,
      dropDownContainerMaxHeight,
      dropDownContainerHeight,
      theme = defTheme,
      dropDownStyle,
      dropDownItemStyle,
      dropDownItemSelectedStyle,
      dropDownItemTextStyle,
      dropDownItemSelectedTextStyle,
      accessibilityLabel,
    } = props;
    const [displayValue, setDisplayValue] = useState('');
    const [inputLayout, setInputLayout] = useState({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    });

    const onLayout = (event: LayoutChangeEvent) => {
      setInputLayout(event.nativeEvent.layout);
    };

    useEffect(() => {
      if (multiSelect) {
        const _labels = list
          .filter((_) => value.indexOf(_.value) !== -1)
          .map((_) => _.label)
          .join(', ');
        setDisplayValue(_labels);
      } else {
        const _label = list.find((_) => _.value === value)?.label;
        if (_label) {
          setDisplayValue(_label);
        }
      }
    }, [list, value]);

    const isActive = useCallback(
      (currentValue: any) => {
        if (multiSelect) {
          return value.indexOf(currentValue) !== -1;
        } else {
          return value === currentValue;
        }
      },
      [value]
    );

    const setActive = useCallback(
      (currentValue: any) => {
        if (multiSelect) {
          const valueIndex = value.indexOf(currentValue);
          const values = value.split(',');
          if (valueIndex === -1) {
            setValue([...values, currentValue].join(','));
          } else {
            setValue([...values].filter((e) => e !== currentValue).join(','));
          }
        } else {
          setValue(currentValue);
        }
      },
      [value]
    );

    return (
      <Menu
        visible={visible}
        onDismiss={onDismiss}
        theme={theme}
        anchor={
          <TouchableRipple
            ref={ref as any}
            onPress={showDropDown}
            onLayout={onLayout}
            accessibilityLabel={accessibilityLabel}
          >
            <View pointerEvents={'none'}>
              <TextInput
                value={displayValue}
                mode={mode}
                label={label}
                placeholder={placeholder}
                pointerEvents={'none'}
                onFocus={showDropDown}
                theme={theme}
                right={
                  <TextInput.Icon icon={visible ? 'menu-up' : 'menu-down'} />
                }
                {...inputProps}
              />
            </View>
          </TouchableRipple>
        }
        style={{
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
          ...dropDownStyle,
        }}
      >
        <KeyboardAvoidingView
          style={styles.flex1}
          behavior={'padding'}
          keyboardVerticalOffset={55}
          enabled={true}
        >
          <ScrollView
            bounces={false}
            style={{
              ...(dropDownContainerHeight
                ? {
                    height: dropDownContainerHeight,
                  }
                : {
                    maxHeight: dropDownContainerMaxHeight || 200,
                  }),
            }}
          >
            <TextInput
              value={displayValue}
              mode={mode}
              label={label}
              placeholder={`Search ${placeholder}`}
              theme={theme}
              right={<TextInput.Icon icon={'magnify'} />}
              style={styles.wrapSearch}
            />
            {list.map((_item, _index) => (
              <Fragment key={_item.value}>
                <TouchableRipple
                  style={styles.itemRipple}
                  onPress={() => {
                    setActive(_item.value);
                    if (onDismiss) {
                      onDismiss();
                    }
                  }}
                >
                  <Fragment>
                    <Menu.Item
                      titleStyle={{
                        color: isActive(_item.value)
                          ? activeColor || theme?.colors.primary
                          : theme?.colors.onBackground,
                        ...(isActive(_item.value)
                          ? dropDownItemSelectedTextStyle
                          : dropDownItemTextStyle),
                      }}
                      title={_item.custom || _item.label}
                      style={[
                        styles.flex1,
                        {
                          maxWidth: inputLayout?.width,
                          ...(isActive(_item.value)
                            ? dropDownItemSelectedStyle
                            : dropDownItemStyle),
                        },
                      ]}
                    />
                    {multiSelect && (
                      <Checkbox.Android
                        theme={{
                          colors: { accent: theme?.colors.primary },
                        }}
                        status={isActive(_item.value) ? 'checked' : 'unchecked'}
                        onPress={() => setActive(_item.value)}
                      />
                    )}
                  </Fragment>
                </TouchableRipple>
                <Divider />
              </Fragment>
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </Menu>
    );
  }
);

export default DropDown;

const styles = StyleSheet.create({
  wrapSearch: {
    marginHorizontal: 16,
  },
  itemRipple: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
});
