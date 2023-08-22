import { Grid, GridItem } from "@chakra-ui/react"
import LoginCard from "../components/LoginCard"
import LoginLogo from "../components/LoginLogo"

const LoginPage = () => {
  return (
    <Grid templateColumns='repeat(2, 50%)'>
        <GridItem margin='3rem'><LoginCard/></GridItem>
        <GridItem width='100%' overflow='hidden'><LoginLogo/></GridItem> 
    </Grid>
    
  )
}

export default LoginPage