import { Box, Text } from "@chakra-ui/react"

const NavBar = () => {
  return (
    <Box padding='1rem' height='5rem' width='100%' background="gray.800" position='fixed' top='0 'display='flex' justifyContent="space-between">
        <Text>GoStudy</Text>
        <Box width='50px' borderRadius='100%' background='#fff'/>
        </Box>
  )
}

export default NavBar