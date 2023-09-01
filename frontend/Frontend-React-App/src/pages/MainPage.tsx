import { Box } from "@chakra-ui/react"
import NavBar from "../components/NavBar"
import CurrentGroups from "../components/CurrentGroups"

const MainPage = () => {
  return (
    <Box>
        <NavBar/>
        <CurrentGroups/>
    </Box>
  )
}

export default MainPage