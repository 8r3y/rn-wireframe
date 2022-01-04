import React from 'react';
import { View } from 'react-native';
import { colors } from 'theme';

interface ISpacer {
  height?: number | string;
  width?: number | string;
  color?: string;
}

export const Spacer = ({
  height = 0,
  width = '100%',
  color = colors.transparent,
}: ISpacer) => <View style={{ height, width, backgroundColor: color }} />;
