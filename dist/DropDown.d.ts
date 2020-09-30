import { TouchableWithoutFeedback } from "react-native";
import React, { ReactNode } from "react";
import { TextInputProps } from "react-native-paper/lib/typescript/src/components/TextInput/TextInput";
import { Theme } from "react-native-paper/lib/typescript/src/types";
declare type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
export interface DropDownPropsInterface {
    visible: boolean;
    onDismiss: () => void;
    showDropDown: () => void;
    value: string | number | undefined;
    setValue: (_value: string | number) => void;
    label?: string | undefined;
    placeholder?: string | undefined;
    mode?: "outlined" | "flat" | undefined;
    inputProps?: TextInputPropsWithoutTheme;
    list: Array<{
        label: string;
        value: string | number;
        custom?: ReactNode;
    }>;
    dropDownContainerMaxHeight?: number;
    activeColor?: string;
    theme?: Theme;
}
declare type TextInputPropsWithoutTheme = Without<TextInputProps, "theme">;
declare const DropDown: React.ForwardRefExoticComponent<DropDownPropsInterface & React.RefAttributes<TouchableWithoutFeedback>>;
export default DropDown;
