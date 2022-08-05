import { TextStyle, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { Theme } from "react-native-paper/lib/typescript/types";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
declare type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
export interface DropDownPropsInterface {
    visible: boolean;
    disabled?: boolean;
    multiSelect?: boolean;
    onDismiss: () => void;
    showDropDown: () => void;
    value: any;
    setValue: (_value: any) => void;
    label?: string;
    subtitle?: string;
    placeholder?: string;
    mode?: "outlined" | "flat";
    inputProps?: TextInputPropsWithoutTheme;
    list: Array<{
        label: string;
        value: string | number;
        custom?: ReactNode;
    }>;
    dropDownContainerMaxHeight?: number;
    dropDownContainerHeight?: number;
    activeColor?: string;
    theme?: Theme;
    dropDownStyle?: ViewStyle;
    dropDownItemSelectedTextStyle?: TextStyle;
    dropDownItemSelectedStyle?: ViewStyle;
    dropDownItemStyle?: ViewStyle;
    dropDownItemTextStyle?: TextStyle;
    accessibilityLabel?: string;
}
declare type TextInputPropsWithoutTheme = Without<TextInputProps, "theme">;
declare const DropDown: any;
export default DropDown;
