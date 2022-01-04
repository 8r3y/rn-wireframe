const pallete = {
  red: '#DB5058',
  darkRed: '#C2434B',
  grey: '#95999F',
  black: '#121713',
  white: '#FFFFFF',
  lightGrey: '#F3F3F3',
  darkGrey: '#555B65',
  bej: '#E9DED1',
  transparent: 'transparent',
  cadetBlue: '#A4AEC5',
};

export const colors = {
  textDefault: pallete.black,
  textLightContent: pallete.white,
  textGrey: pallete.grey,
  link: pallete.red,
  textDisabled: pallete.grey,
  darkBackground: pallete.black,
  profileBackground: pallete.red,
  contentBackground: pallete.lightGrey,
  lightBackground: pallete.white,
  logoName: pallete.darkRed,
  buttonPrimary: pallete.black,
  buttonDisabled: pallete.grey,
  buttonLoading: pallete.red,
  tabActive: pallete.red,
  tabInactive: pallete.grey,
  transparent: pallete.transparent,
  border: pallete.cadetBlue,
  inputBackground: pallete.lightGrey,
  error: pallete.red,
  placeholder: pallete.grey,
  indicatorLight: pallete.white,
  progressBar: pallete.red,
  buttonPlayDisabled: pallete.grey,
  buttonPlayActive: pallete.red,
};

export const sizes = {
  small: 'small',
  normal: 'normal',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
  link: 'link',
  xlink: 'xlink',
};
export type Sizes = keyof typeof sizes;

type FontSize = number;
type LineHeight = number;
type TupleWithSizes = [FontSize, LineHeight];
const fontSizes = {
  [sizes.small]: [12, 18] as TupleWithSizes,
  [sizes.normal]: [16, 21] as TupleWithSizes,
  [sizes.medium]: [20, 26] as TupleWithSizes,
  [sizes.large]: [30, 40] as TupleWithSizes,
  [sizes.xlarge]: [36, 48] as TupleWithSizes,
  [sizes.link]: [16, 21] as TupleWithSizes,
  [sizes.xlink]: [20, 26] as TupleWithSizes,
};

export const types = {
  regular: 'regular',
  medium: 'medium',
  bold: 'bold',
};
export type Types = keyof typeof types;

const fontFamilies = {
  [types.regular]: 'FiraSans-Regular',
  [types.bold]: 'FiraSans-Bold',
  [types.medium]: 'FiraSans-Medium',
};

type FontSizeTypes = keyof typeof fontSizes;
type FontFamilyTypes = keyof typeof fontFamilies;

interface Typography {
  fontSizes: { [key in FontSizeTypes]: TupleWithSizes };
  fontFamilies: { [key in FontFamilyTypes]: string };
}

export const typography: Typography = {
  fontSizes,
  fontFamilies,
};
