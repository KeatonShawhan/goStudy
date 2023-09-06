import { Box, Button, Grid, GridItem, Input, List, ListItem, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const hostName = import.meta.env.VITE_HOST_NAME;
// const socketHostName = import.meta.env.SOCKET_HOST_NAME;
import { io } from 'socket.io-client'

interface OldMessages {
  messages: [
    {
      message: 'string';
      sentBy: 'string';
      timestamp: 'string';
    },
    {
      message: 'string';
      sentBy: 'string';
      timestamp: 'string';
    }
  ]
}

const StudyGroupPage = () => {
  const socket = io(hostName)
  const { param } = useParams();
  const user = localStorage.getItem('username')
  const [oldMessages, setOldMessages] = useState<OldMessages>();
  const [message, setMessage] = useState('');
  const [newmessage, setNewMessage] = useState();

  const [userMessage, setUserMessage] = useState("");
  const [gpt4Answer, setGpt4Answer] = useState("");

  const handleSubmit = async () => {
    const response = await axios.post('/api/askGPT4', { message: userMessage });
    setGpt4Answer(response.data.gpt4Answer);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    socket.emit('sendmessage', message, `${param}`);

  };
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
        })
        socket.on('message', (mes) => {
          setNewMessage(mes);
        });
      
     }, [])




  return (
    <Box width='100vw' height='100vh'>
    <Grid templateColumns='repeat(2, 50vw)' margin='2rem' columnGap='1rem'>
        <GridItem>
          <Box width='50vw' height='80vh' background='white' borderRadius='20px'>
            <List width='100%' height='30%'>{oldMessages?.messages === undefined || oldMessages.messages === null ? null : oldMessages?.messages.map(message => <ListItem key={message.message}><Text color='black' >{message.sentBy}</Text><Text color='black'>{message.message}</Text><Text color='black'>{message.timestamp}</Text></ListItem>)}</List>
            <List width='100%' height='30%'><ListItem color='black' height='10px'>{newmessage}</ListItem></List>
            <Input type="text" value={message} border='3px solid #000'color='#000' onChange={handleInputChange}/>
          </Box>
        </GridItem>
        <GridItem display='flex' justifyContent='center' alignItems='center'>
        <Box width='50vw' height='80vh' background='white' borderRadius='20px'>
      <Input 
      color='black'
        type="text" 
        value={userMessage}
        border='2px solid #000'
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <Button onClick={handleSubmit} border='1px solid #000' color='black'>Ask</Button>
      <Text color='black'>Answer from GPT-4: {gpt4Answer}</Text>
    </Box></GridItem> 
    </Grid>
  </Box> 
  )
}

export default StudyGroupPage