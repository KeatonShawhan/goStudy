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
          <FormControl marginBottom='.5rem' isRequired onSubmit={handleSubmit}>
            
            <FormLabel color='#cfd9e8' htmlFor="email">Email</FormLabel>
            <Input type='email' id="email" value={formData.email} marginBottom='.5rem' border='1px solid #6896d9' onChange={e => setFormData({...formData, email: e.target.value})}/>

            <FormLabel color='#cfd9e8' htmlFor="username">Username</FormLabel>
            <Input type='text' id="username" value={formData.username} marginBottom='.5rem' border='1px solid #6896d9' onChange={e => setFormData({...formData, username: e.target.value})}/>

            <FormLabel color='#cfd9e8' htmlFor="major">Major</FormLabel>
            <Input type='text' id="major" marginBottom='.5rem' value={formData.major} border='1px solid #6896d9' onChange={e => setFormData({...formData, major: e.target.value})}/>

            <FormLabel color='#cfd9e8' htmlFor="createpassword">Create Password</FormLabel>
            <Input type='password' id="createpassword" value={formData.password} border='1px solid #6896d9' marginBottom='.5rem' onChange={e => setFormData({...formData, password: e.target.value})}/>

            <Button borderRadius='10px' width='100%' background='#6896d9' type="submit">Sign In</Button>
          </FormControl>  
          <Text>{Array.isArray(users) ? users.map(user => <Text id={user.user_id.toString()}>{user.message}</Text>) : "user"}</Text>
          <Text>{Array.isArray(error) ? error.map(error => <Text id={error.error}>{error.error}</Text>): "error"}</Text>
      </Box>
    </Box>

    
  )
}

export default CreateUserCard