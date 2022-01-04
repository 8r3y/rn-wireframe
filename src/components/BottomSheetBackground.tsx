import React from 'react';
import { View, ViewProps } from 'react-native';
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { colors } from 'theme';

interface IBottomSheetBackground {
  paddingTop?: boolean;
}

export const BottomSheetBackground: React.FC<
  IBottomSheetBackground & BottomSheetBackgroundProps
> = ({ style, paddingTop = false }) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.transparent,
        },
        paddingTop && { paddingTop: 40 },
        { ...(style as ViewProps) },
      ]}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.lightBackground,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
      />
    </View>
  );
};
