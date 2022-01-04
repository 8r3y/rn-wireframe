import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { FieldProps } from 'formik';
import { Typography } from 'components';
import { typography, colors } from 'theme';
import { HideIcon, ShowIcon } from 'assets/img';

export const CustomBottomSheetTextInput = (props: FieldProps & TextInputProps) => {
  const [isHide, setIsHide] = useState(!!props.secureTextEntry);
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <BottomSheetTextInput
        style={[
          styles.textInput,
          hasError === true && styles.errorInput,
          { paddingRight: props.secureTextEntry ? 40 : 15 },
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        numberOfLines={1}
        placeholderTextColor={colors.placeholder}
        {...inputProps}
        secureTextEntry={isHide}
      />
      {hasError && (
        <Typography size="small" color={colors.error} style={styles.errorText}>
          {errors[name]}
        </Typography>
      )}
      {props.secureTextEntry && (
        <View style={styles.hide}>
          <TouchableOpacity
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            onPress={() => setIsHide((prev) => !prev)}
            activeOpacity={0.8}
            style={styles.hideTouchableArea}
          >
            <View style={styles.hideIconWrapper}>
              {isHide ? <HideIcon /> : <ShowIcon />}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    paddingLeft: 15,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    fontSize: typography.fontSizes.normal[0],
    fontFamily: typography.fontFamilies.regular,
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: colors.textDefault,
  },
  errorText: {
    position: 'absolute',
    left: 0,
    top: 40,
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
  errorInput: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  hide: {
    position: 'absolute',
    top: 2,
    right: 5,
    bottom: 2,
    width: 40,
  },
  hideTouchableArea: {
    flex: 1,
  },
  hideIconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});