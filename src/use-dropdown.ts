import { useCallback, useState, useMemo } from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  LayoutRectangle,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

function useDropdown(maxMenuHeight?: number, maxHeightFraction: number = 2.5) {
  const [enable, setEnable] = useState(false);
  const { height } = useWindowDimensions();
  const finalMenuHeight = maxMenuHeight ?? height / maxHeightFraction;

  const [dropdownLayout, setDropdownLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const toggleMenu = useCallback(() => {
    Keyboard.dismiss();
    setEnable((prev) => !prev);
  }, []);

  const onLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setDropdownLayout(layout);
    },
    []
  );

  const menuStyle: ViewStyle = useMemo(
    () => ({
      width: dropdownLayout.width,
    }),
    [dropdownLayout.width]
  );

  return {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    dropdownLayout,
  };
}

export default useDropdown;
