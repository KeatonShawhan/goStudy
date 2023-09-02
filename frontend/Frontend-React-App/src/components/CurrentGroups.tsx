import { Box, List, ListItem, Text } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react";
const hostName = import.meta.env.VITE_HOST_NAME;



const CurrentGroups = () => {
  const [studyGroups, setStudyGroups] = useState();
  const [error, setError] = useState();
  const createStudyGroupRequest = () => {
      axios // make API Request                   
      .get(`${hostName}/api/my-study-groups`, {
          headers: {
          'Content-Type': 'application/json',
          // This thing below is the header for how you pass in the token to a protected endpoint
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then((res) => {
          setStudyGroups(res.data)
      })
      // do smth with error if it happens, look at the endpoint in routes.js for specific error code meanings or ask Luca
      .catch(err => setError(err))
  }
  return (
    <>
    <Box width='80%' height='100%' position='fixed' left='0' marginTop='5rem'>

    </Box>
    <Box width='20%' position='fixed' right='0' height='100%' marginTop='5rem' marginBottom='1.5rem'background={"gray.900"}>
      <Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Text color='white' fontSize='2xl' paddingTop='.5rem' >Current Groups</Text>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <List>
            <ListItem color='#6896d9'>hello</ListItem>
          </List>
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default CurrentGroups