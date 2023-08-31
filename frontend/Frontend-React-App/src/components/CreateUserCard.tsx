import { FormControl, FormLabel, Input, Button, Box, Text } from "@chakra-ui/react"
import axios from "axios"
import { ChangeEvent, useState } from "react"

const hostName = import.meta.env.VITE_HOST_NAME;

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

// const dummyUser: User = {
//   username: 'clay',
//   password: 'bob',
//   email: 'clay.fell8@gmail.com',
//   major: 'comp sci'
// }


const CreateUserCard = () => {
  const [error, setError] = useState<UserError[]>([]);
  const [users, setUsers] = useState<UserSuccess[]>([]);
  const [formData, setFormData] = useState<User>({
    username: '',
    password: '',
    email: '',
    major: ''
  });
  
  const apiRequest = () => {
    axios
    .post(`${hostName}/api/register`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      setUsers(res.data),
      console.log(res)
    })
    .catch(err => setError(err)) 
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiRequest();
    console.log(formData);
  }

  return (
    <Box width='100%' display='flex' justifyContent='center' alignItems='center' marginTop='1rem'>
      <Box  width='30rem' background='gray.700' borderRadius='5px' padding='2rem' marginBottom='1rem'>
        <Text color='#cfd9e8' fontWeight='bold' fontSize='2xl' textAlign='center' marginBottom='2rem'>CREATE USER</Text>
          <FormControl marginBottom='.5rem' isRequired onSubmit={handleSubmit}>
            
            <FormLabel color='#cfd9e8' htmlFor="email">Email</FormLabel>
            <Input type='email' id="email" name="email" marginBottom='.5rem' border='1px solid #6896d9' onChange={handleInputChange}/>

            <FormLabel color='#cfd9e8' htmlFor="username">Username</FormLabel>
            <Input type='text' id="username" name="username"  marginBottom='.5rem' border='1px solid #6896d9' onChange={handleInputChange}/>

            <FormLabel color='#cfd9e8' htmlFor="major">Major</FormLabel>
            <Input type='text' id="major" name="major" marginBottom='.5rem' border='1px solid #6896d9' onChange={handleInputChange}/>

            <FormLabel color='#cfd9e8' htmlFor="createpassword">Create Password</FormLabel>
            <Input type='password' id="createpassword" name="password" border='1px solid #6896d9' marginBottom='.5rem' onChange={handleInputChange}/>

            <Button borderRadius='10px' width='100%' background='#6896d9' type="submit">Sign In</Button>
          </FormControl>  
          <Text>{users.map(user => <p id={user.message}>{user.user_id}</p>)}</Text>
          <Text>{error.map(err => <p id={err.error}>{err.error}</p>)}</Text>
      </Box>
    </Box>
  )
}

export default CreateUserCard
