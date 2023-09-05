import { Box, Grid, GridItem, List, ListItem, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const hostName = import.meta.env.VITE_HOST_NAME;
const socketHostName = import.meta.env.SOCKET_HOST_NAME;
import { io } from 'socket.io-client'

interface OldMessages {
  messages: [
    {
      message: 'string';
      sentBy: 'string';
      timestamp: 'string'
    },
    {
      message: 'string';
      sentBy: 'string';
      timestamp: 'string'
    }
  ]
}

const StudyGroupPage = () => {
  const socket = io(socketHostName)
  const { param } = useParams();
  const user = localStorage.getItem('username')
  const [oldMessages, setOldMessages] = useState<OldMessages>();
  useEffect(() => {
    socket.emit('join', { groupId: `${param}`, username: `${user}`})
      axios.get(
        `${hostName}/api/get-chat/${param}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((res) => {
            // successful request gives you this json obj { message: 'Study group deleted' }
            // do what you need to with that info, like redirect to off of that study group page
           setOldMessages(res.data.messages)
        })
        // do smth with error if it happens, look at the endpoint in routes.js for specific error code meanings or ask Luca
        .catch(err => {
          console.log(err);
        }
      )
     }, [])


  return (
    <Box width='100vw' height='100vh'>
    <Grid templateColumns='repeat(2, 50vw)' margin='2rem' columnGap='1rem'>
        <GridItem>
          <Box width='100%' height='100%' background='white' borderRadius='20px'>
            <List>{oldMessages?.messages.map(message => <ListItem><Text>{message.sentBy}</Text><Text>{message.message}</Text><Text>{message.timestamp}</Text></ListItem>)}</List>
          </Box>
        </GridItem>
        <GridItem display='flex' justifyContent='center' alignItems='center'></GridItem> 
    </Grid>
  </Box> 
  )
}

export default StudyGroupPage