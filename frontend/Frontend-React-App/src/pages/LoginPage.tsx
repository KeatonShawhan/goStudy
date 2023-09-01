import { Box, Grid, GridItem } from "@chakra-ui/react"
import LoginCard from "../components/LoginCard"
import LoginLogo from "../components/LoginLogo"

const LoginPage = () => {
  return (
    <Box width='100%' height='30rem'>
      <Grid templateColumns='repeat(2, 50%)'>
          <GridItem margin='3rem'><LoginCard/></GridItem>
          <GridItem width='100%' overflow='hidden' display='flex' justifyContent='center' paddingTop='4rem'><LoginLogo/></GridItem> 
      </Grid>
    </Box> 
  )
}

export default LoginPage