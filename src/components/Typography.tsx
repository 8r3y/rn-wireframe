import React from 'react';
import { Text, TextProps, TextStyle, StyleSheet } from 'react-native';
import { typography, sizes, Sizes, types, Types } from 'theme';

interface ITypography {
  size: Sizes;
  color: string;
  type?: Types;
  style?: TextStyle;
  children?: React.ReactNode;
}

export function Typography({
  size,
  color,
  type,
  style,
  children,
  ...props
}: ITypography & TextProps) {
  return (
    <Text
      {...props}
      style={[
        style,
        { color },
        sizeStyles[size],
        type !== undefined && typeStyles[type],
        commonFontStyles.basic,
      ]}
    >
      {children}
    </Text>
  );
}

const commonFontStyles = StyleSheet.create({
  basic: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

const sizeStyles = StyleSheet.create({
  [sizes.normal]: {
    fontSize: typography.fontSizes.normal[0],
    lineHeight: typography.fontSizes.normal[1],
    fontFamily: typography.fontFamilies.regular,
  },
  [sizes.small]: {
    fontSize: typography.fontSizes.small[0],
    lineHeight: typography.fontSizes.small[1],
    fontFamily: typography.fontFamilies.regular,
  },
  [sizes.medium]: {
    fontSize: typography.fontSizes.medium[0],
    lineHeight: typography.fontSizes.medium[1],
    fontFamily: typography.fontFamilies.medium,
  },
  [sizes.large]: {
    fontSize: typography.fontSizes.large[0],
    lineHeight: typography.fontSizes.large[1],
    fontFamily: typography.fontFamilies.bold,
  },
  [sizes.xlarge]: {
    fontSize: typography.fontSizes.xlarge[0],
    lineHeight: typography.fontSizes.large[1],
    fontFamily: typography.fontFamilies.bold,
  },
  [sizes.link]: {
    fontSize: typography.fontSizes.link[0],
    lineHeight: typography.fontSizes.link[1],
    fontFamily: typography.fontFamilies.regular,
    textDecorationLine: 'underline',
  },
  [sizes.xlink]: {
    fontSize: typography.fontSizes.xlink[0],
    lineHeight: typography.fontSizes.xlink[1],
    fontFamily: typography.fontFamilies.regular,
    textDecorationLine: 'underline',
  },
});

const typeStyles = StyleSheet.create({
  [types.regular]: {
    fontFamily: typography.fontFamilies.regular,
  },
  [types.medium]: {
    fontFamily: typography.fontFamilies.medium,
  },
  [types.bold]: {
    fontFamily: typography.fontFamilies.bold,
  },
});
