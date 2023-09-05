import { Box, Grid, GridItem } from "@chakra-ui/react"
import LoginCard from "../components/LoginCard"
import LoginLogo from "../components/LoginLogo"

const LoginPage = () => {
  return (
    <Box width='100%' height='100%'>
      <Grid templateColumns='repeat(2, 50%)'>
          <GridItem margin='6rem'><LoginCard/></GridItem>
          <GridItem display='flex' justifyContent='center' alignItems='center'><LoginLogo/></GridItem> 
      </Grid>
    </Box> 
  )
}

export default LoginPage