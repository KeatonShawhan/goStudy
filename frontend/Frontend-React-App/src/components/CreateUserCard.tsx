import { FormControl, FormLabel, Input, Button, Box, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"

interface User {
  username: string,
  password: string,
  email: string,
  major: string
}
interface UserSuccess {
  message: string;
  user_id: number;
}

interface UserError {
  error: string;
}

const dummyUser: User = {
  username: 'clay',
  password: 'bob',
  email: 'clay.fell8@gmail.com',
  major: 'comp sci'
}


const CreateUserCard = () => {

  const [error, setError] = useState<UserError[]>([]);
  const [users, setUsers] = useState<UserSuccess[]>([]);
  const JSON_dummyUser = JSON.stringify(dummyUser);


  useEffect(() => {
    axios
    .post('http://localhost:3000/api/register', JSON_dummyUser)
    .then((res) => {console.log(res.data),setUsers(res.data)})
    .catch(err => setError(err)) 
  }, [])

  return (
    <Box width='100%' display='flex' justifyContent='center' alignItems='center' marginTop='1rem'>
      <Box  width='30rem' background='gray.700' borderRadius='5px' padding='2rem' marginBottom='1rem'>
        <Text color='#cfd9e8' fontWeight='bold' fontSize='2xl' textAlign='center' marginBottom='2rem'>CREATE USER</Text>
          <FormControl marginBottom='.5rem' isRequired>
            
            <FormLabel color='#cfd9e8'>Email</FormLabel>
            <Input type='email' marginBottom='.5rem' border='1px solid #6896d9' />

            <FormLabel color='#cfd9e8'>Username</FormLabel>
            <Input type='text' marginBottom='.5rem' border='1px solid #6896d9' />

            <FormLabel color='#cfd9e8'>Major</FormLabel>
            <Input type='text' marginBottom='.5rem' border='1px solid #6896d9' />

            <FormLabel color='#cfd9e8'>Create Password</FormLabel>
            <Input type='password' border='1px solid #6896d9' marginBottom='.5rem' />

            <FormLabel color='#cfd9e8'>Confirm Password</FormLabel>
            <Input type='password' border='1px solid #6896d9' marginBottom='2rem' />

            <Button borderRadius='10px' width='100%' background='#6896d9'>Sign In</Button>
          </FormControl>  
          <Text>{Array.isArray(users) ? users.map(user => <p id={user.user_id.toString()}>{user.message}</p>) : "user"}</Text>
          <Text>{Array.isArray(error) ? error.map(error => <p id={error.error}>{error.error}</p>): "error"}</Text>
      </Box>
    </Box>

    
  )
}

export default CreateUserCard