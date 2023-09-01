import { Box, List, ListItem, Text } from "@chakra-ui/react"

const CurrentGroups = () => {
  return (
    <Box width='13rem' position='fixed' right='0' height='100%' marginTop='5rem' background={"gray.900"}>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Text color='white' fontSize='3xl' paddingTop='2rem'>Current Groups</Text>
        <List>
            <ListItem color='white'>hello</ListItem>
            <ListItem color='white'>hello</ListItem>
            <ListItem color='white'>hello</ListItem>
            <ListItem color='white'>hello</ListItem>
            <ListItem color='white'>hello</ListItem>
        </List>
      </Box>   
    </Box>
  )
}

export default CurrentGroups