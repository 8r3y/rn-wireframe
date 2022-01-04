import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from 'theme';
import { Typography } from 'components';

interface IButton {
  onPress: () => void | undefined;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
}

Button.defaultProps = {
  onPress: () => {},
  title: '',
  loading: false,
  disabled: false,
};

export function Button({ onPress, title, disabled, color, loading }: IButton) {
  const defaultColor = loading
    ? colors.buttonLoading
    : disabled
    ? colors.buttonDisabled
    : colors.buttonPrimary;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={styles.touchable}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: defaultColor },
          color !== undefined && { backgroundColor: color },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.indicatorLight} />
        ) : (
          <Typography size="normal" color={colors.textLightContent}>
            {title}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: colors.buttonPrimary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 25,
  },
  touchable: {
    width: '100%',
  },
});
