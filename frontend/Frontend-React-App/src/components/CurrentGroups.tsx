import { Box, Button, Grid, GridItem, List, ListItem, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import StudyGroup from "../entities/StudyGroup";
import { Link, useNavigate } from "react-router-dom";
const hostName = import.meta.env.VITE_HOST_NAME;


const CurrentGroups = () => {
  const [myStudyGroups, setMyStudyGroups] = useState<StudyGroup[]>();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>();
  const [error, setError] = useState<Error>();
  const navigate = useNavigate();
  const getMyStudyGroups = () => {
    axios // make API Request                   
  .get(`${hostName}/api/my-study-groups`, {
      headers: {
      'Content-Type': 'application/json',
      // This thing below is the header for how you pass in the token to a protected endpoint
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
  .then((res) => {
      setMyStudyGroups(res.data.groups)
  })
  // do smth with error if it happens, look at the endpoint in routes.js for specific error code meanings or ask Luca
  .catch(err => setError(err))
}
const getStudyGroups = () => {
  axios
  .get(`${hostName}/api/available-study-groups`, {
      headers: {
      'Content-Type': 'application/json',
      // This thing below is the header for how you pass in the token to a protected endpoint
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      }})
  .then((res) => setStudyGroups(res.data.groups))
  .catch(err => {
    setError(err);
    console.log(err);
  }
  )
}

const joinStudyGroupRequest = (groupJoin: StudyGroup) => {
  axios.post(
    `${hostName}/api/join-study-group/${groupJoin.group_id}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
        // successful request gives you this json obj { message: 'Study group deleted' }
        // do what you need to with that info, like redirect to off of that study group page
       getMyStudyGroups();
       getStudyGroups();
    })
    // do smth with error if it happens, look at the endpoint in routes.js for specific error code meanings or ask Luca
    .catch(err => {
      setError(err);
      console.log(groupJoin.group_id);
    }
      )
}

  useEffect(() => {
    getMyStudyGroups();
    getStudyGroups();
}, [])

  return (
    <>
    <Box width='80%' height='100%' position='fixed' left='0' marginTop='5rem'>
    <Box padding='1rem'>
      <Grid templateColumns='repeat(3, 1fr)' gap='6'>
      {studyGroups?.map(group => <GridItem width='100%' background='gray.900' borderRadius='10px'><Text textAlign='center' fontSize='2xl'>{group.group_name}</Text><Text textAlign='center' color='#6896d9' marginTop='1rem'>{group.subject}</Text> <Button margin='1rem' onClick={() => joinStudyGroupRequest(group)}>Join Study Group</Button><Button onClick={() => navigate('/')}>View Study Group</Button></GridItem>)}
      </Grid>
      <Button margin='2rem' onClick={() => getStudyGroups()}>Refresh Groups</Button>
      </Box>
    </Box>
    <Box width='20%' position='fixed' right='0' height='100%' marginTop='5rem' marginBottom='1.5rem'background={"gray.900"}>
      <Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Text color='white' fontSize='2xl' paddingTop='.5rem' >Current Groups</Text>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <List>
          {myStudyGroups?.map(group => <ListItem textAlign='center'><Link to={`/studygroup/${group.group_id}`} >{group.group_name}</Link></ListItem>)}
          <Button onClick={() => getMyStudyGroups()}>Refresh My Groups</Button>
          <Text textAlign='center'>{error?.message}</Text>
          </List>
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default CurrentGroups