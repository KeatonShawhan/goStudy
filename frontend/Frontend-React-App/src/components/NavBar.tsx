import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import axios from "axios";
import { ChangeEvent, useState } from "react";
const hostName = import.meta.env.VITE_HOST_NAME;


const NavBar = () => {
  const [studyGroup, setStudyGroup] = useState({ 
    group_name: '',
    subject: ''
  }) 
  const [error, setError] = useState({
    error: ''
  })
  const [isVisible, setVisible] = useState(false);

    const studyGroupRequest = () => {
        axios // make API Request                   
        .post(`${hostName}/api/create-study-group`, studyGroup, {
            headers: {
            'Content-Type': 'application/json',
            // This thing below is the header for how you pass in the token to a protected endpoint
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            // successful request gives you this json obj { message: 'Study group created', group_id: groupId }
            // do what you need to with that info, like redirect to that study group page
            console.log(res)
        })
        // do smth with error if it happens, look at the endpoint in routes.js for specific error code meanings or ask Luca
        .catch(err => setError(err))
    }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudyGroup(() => ({
      ...studyGroup,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    studyGroupRequest();
    showForm();
  }

  const showForm = () => {
    setVisible(!isVisible)
  }

  return (
    <>
    <Box padding='1rem' height='5rem' width='100%' background="gray.900" position='fixed' top='0 'display='flex' justifyContent="space-between">
      <Box display='flex' alignItems='center'>
      <Text fontSize='4xl'>GoStudy</Text>
      </Box>
      <Box display='flex' alignItems='center'>
      <Text as='button' onClick={showForm}>Create Group</Text>
      </Box>
        <Box width='50px' borderRadius='100%' background='#fff'/>
        </Box>
        {isVisible ? <Box display='flex' justifyContent='center' alignItems='center'>
          <Box marginTop='10rem' width='20rem' height='20rem' background='gray.900' padding='1rem'>
       <form onSubmit={handleSubmit}>
      <FormControl marginBottom='1rem'>

        <FormLabel color='#cfd9e8' htmlFor='group_name'>Group Name</FormLabel>
        <Input type='text' name='group_name' required id='group_name' marginBottom='1rem' border='1px solid #6896d9' onChange={handleInputChange}/>

        <FormLabel color='#cfd9e8' htmlFor='subject'>Subject</FormLabel>
        <Input type='text' id='subject' required name='subject' border='1px solid #6896d9' marginBottom='1rem' onChange={handleInputChange}/>

        <Button borderRadius='10px' width='100%' background='#6896d9' type='submit' >Create Group</Button>
      </FormControl>
      <Text>{error.error}</Text>
      </form>
      </Box>
    </Box> : null}
    </>
  )
}

export default NavBar