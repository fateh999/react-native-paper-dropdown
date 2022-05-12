import { ScrollView, View, } from "react-native";
import { Checkbox, Divider, Menu, TextInput, TouchableRipple, useTheme, } from "react-native-paper";
import React, { forwardRef, useEffect, useState, useCallback, Fragment, } from "react";
const DropDown = forwardRef((props, ref) => {
    const activeTheme = useTheme();
    const { multiSelect = false, visible, onDismiss, showDropDown, value, setValue, activeColor, mode, label, placeholder, inputProps, list, dropDownContainerMaxHeight, dropDownContainerHeight, theme, style, dropDownStyle, dropDownItemStyle, dropDownItemSelectedStyle, dropDownItemTextStyle, dropDownItemSelectedTextStyle, accessibilityLabel, } = props;
    const [displayValue, setDisplayValue] = useState("");
    const [inputLayout, setInputLayout] = useState({
        height: 0,
        width: 0,
        x: 0,
        y: 0,
    });
    const onLayout = (event) => {
        setInputLayout(event.nativeEvent.layout);
    };
    useEffect(() => {
        if (multiSelect) {
            const _labels = list
                .filter((_) => value.indexOf(_.value) !== -1)
                .map((_) => _.label)
                .join(", ");
            setDisplayValue(_labels);
        }
        else {
            const _label = list.find((_) => _.value === value)?.label;
            if (_label) {
                setDisplayValue(_label);
            }
        }
    }, [list, value]);
    const isActive = useCallback((currentValue) => {
        if (multiSelect) {
            return value.indexOf(currentValue) !== -1;
        }
        else {
            return value === currentValue;
        }
    }, [value]);
    const setActive = useCallback((currentValue) => {
        if (multiSelect) {
            const valueIndex = value.indexOf(currentValue);
            const values = value.split(",");
            if (valueIndex === -1) {
                setValue([...values, currentValue].join(","));
            }
            else {
                setValue([...values].filter((value) => value !== currentValue).join(","));
            }
        }
        else {
            setValue(currentValue);
        }
    }, [value]);
    return (<Menu visible={visible} onDismiss={onDismiss} theme={theme} 
            anchor={
            <TouchableRipple ref={ref} onPress={showDropDown} onLayout={onLayout} accessibilityLabel={accessibilityLabel}>
                <View pointerEvents={"none"}>
                <TextInput value={displayValue} mode={mode} label={label} placeholder={placeholder} pointerEvents={"none"} style={style} theme={theme} right={<TextInput.Icon theme={theme} name={visible ? "menu-up" : "menu-down"}/>} {...inputProps}/>
                </View>
          </TouchableRipple>
            } 
            style={{
            maxWidth: inputLayout?.width,
            width: inputLayout?.width,
            marginTop: inputLayout?.height,
            ...dropDownStyle,
        }}>
        <ScrollView bounces={false} style={{
            marginTop: -8,
            marginBottom: -8,
            ...(dropDownContainerHeight
                ? {
                    height: dropDownContainerHeight,
                }
                : {
                    maxHeight: dropDownContainerMaxHeight || 200,
                }),
        }}>
          {list.map((_item, _index) => (<Fragment key={_item.value}>
              <TouchableRipple style={{
                flexDirection: "row",
                alignItems: "center",
            }} onPress={() => {
                setActive(_item.value);
                if (onDismiss) {
                    onDismiss();
                }
            }}>
                <Fragment>
                  <Menu.Item titleStyle={{
                color: isActive(_item.value)
                    ? activeColor || (theme || activeTheme).colors.primary
                    : (theme || activeTheme).colors.text,
                ...(isActive(_item.value)
                    ? dropDownItemSelectedTextStyle
                    : dropDownItemTextStyle),
            }} title={_item.custom || _item.label} style={{
                flex: 1,
                maxWidth: inputLayout?.width,
                ...(isActive(_item.value)
                    ? dropDownItemSelectedStyle
                    : dropDownItemStyle),
            }}/>
                  {multiSelect && (<Checkbox.Android theme={{
                    colors: { accent: activeTheme?.colors.primary },
                }} status={isActive(_item.value) ? "checked" : "unchecked"} onPress={() => setActive(_item.value)}/>)}
                </Fragment>
              </TouchableRipple>
              <Divider />
            </Fragment>))}
        </ScrollView>
      </Menu>);
});
export default DropDown;
