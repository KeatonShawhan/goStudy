import { extendTheme } from '@chakra-ui/react';
import '@fontsource/nunito'
import '@fontsource/overpass'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: "true"
  },
    fonts: {
      heading: `'Overpass', sans-serif`,
      body: `'Nunito', sans-serif`,
    },
  })


export default theme;