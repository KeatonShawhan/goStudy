import { FormControl, FormLabel, Input, Button, Box, Text } from "@chakra-ui/react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react"
import User from "../entities/User";
import Error from "../entities/Error";
const hostName = import.meta.env.VITE_HOST_NAME;

// const dummyUser: User = {
//   username: 'clay',
//   password: 'bob',
//   email: 'clay.fell8@gmail.com',
//   major: 'comp sci'
// }

const CreateUserCard = () => {
  const [error, setError] = useState<Error>({
    error: ''
  });
  const [formData, setFormData] = useState<User>({
    username: '',
    password: '',
    email: '',
    major: ''
  });
  const navigate = useNavigate();
  const apiRequest = () => {
    axios
    .post(`${hostName}/api/register`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      navigate('/');
    })
    .catch(err => setError({error: err.error})) 
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
  }

  return (
    <Box width='100%' display='flex' justifyContent='center' alignItems='center' marginTop='1rem'>
      <Box  width='30rem' background='gray.700' borderRadius='5px' padding='2rem' marginBottom='1rem'>
        <Text color='#cfd9e8' fontWeight='bold' fontSize='2xl' textAlign='center' marginBottom='2rem'>CREATE USER</Text>
        <form onSubmit={handleSubmit}>
        <FormControl marginBottom='.5rem' isRequired>
            
            <FormLabel color='#cfd9e8' htmlFor="email">Email</FormLabel>
            <Input type='email' id="email" name="email" required marginBottom='.5rem' border='1px solid #6896d9' onChange={handleInputChange}/>

            <FormLabel color='#cfd9e8' htmlFor="username">Username</FormLabel>
            <Input type='text' id="username" required name="username"  marginBottom='.5rem' border='1px solid #6896d9' onChange={handleInputChange}/>

            <FormLabel color='#cfd9e8' htmlFor="major">Major</FormLabel>
            <Input type='text' id="major" required name="major" marginBottom='.5rem' border='1px solid #6896d9' onChange={handleInputChange}/>

            <FormLabel color='#cfd9e8' htmlFor="createpassword">Create Password</FormLabel>
            <Input type='password' required id="createpassword" name="password" border='1px solid #6896d9' marginBottom='2rem' onChange={handleInputChange}/>
            <Button borderRadius='10px' width='100%' background='#6896d9' type="submit" >Sign Up</Button>
          </FormControl>
          <Text>{error.error ? "Unexpected Error" : ''}</Text>
        </form>
      </Box>
    </Box>
  )
}

export default CreateUserCard
