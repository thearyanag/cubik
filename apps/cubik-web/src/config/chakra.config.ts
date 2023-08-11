import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { colors } from '~/theme/colors';
import { components } from '~/theme/components';
import { borders } from '~/theme/foundations';
import { styles } from '~/theme/styles';
import { textStyles } from '~/theme/textStyles';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  fonts: {
    headline: `'Plus Jakarta Sans', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`,
  },
  textStyles,
  colors,
  config,
  styles,
  borders,
  components,
});

export default theme;
