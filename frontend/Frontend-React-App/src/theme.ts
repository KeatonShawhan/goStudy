import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import '@fontsource/nunito'
import '@fontsource/overpass'

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
}

const theme = extendTheme({
    config,
    fonts: {
      heading: `'Overpass', sans-serif`,
      body: `'Nunito', sans-serif`,
    },
  })


export default theme;