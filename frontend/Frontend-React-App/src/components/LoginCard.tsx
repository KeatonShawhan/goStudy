import { Box, FormControl, FormLabel, Input, Text, Button} from '@chakra-ui/react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react'
import Error from '../entities/Error';
const hostName = import.meta.env.VITE_HOST_NAME;


// 

const LoginCard = () => {
  const [loginError, setLoginError] = useState<Error>({
    error: ''
  })
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();
  const loginRequest = () => {
        axios // make API Request                   
        .post(`${hostName}/api/login`, loginData, {
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            // this will give you the token in a json object, so put it in local storage
            localStorage.setItem('token', res.data.token)
            navigate('/main')
        })
        // do smth with error if it happens
        .catch(err => setLoginError(err)) 
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginData(() => ({
        ...loginData,
        [name]: value,
      }));
      localStorage.setItem("username", `${loginData.username}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      loginRequest();
    }
  return (
    <Box width='100%' overflow='hidden' background='gray.700' borderRadius='5px' padding='2rem'>
    <Text color='#cfd9e8' fontWeight='bold' fontSize='2xl'>WELCOME BACK!</Text>
    <Text fontSize='2xs' marginBottom='1rem'>Don't have an account? <p style={{color: "#6896d9", display: 'inline-block'}}><Link to='/register' >Sign up</Link></p></Text>

    <form onSubmit={handleSubmit}>
    <FormControl marginBottom='1rem'>

    <FormLabel color='#cfd9e8' htmlFor='username'>Username</FormLabel>
    <Input type='text' name='username' required id='username' marginBottom='1rem' border='1px solid #6896d9' onChange={handleInputChange}/>

    <FormLabel color='#cfd9e8' htmlFor='password'>Password</FormLabel>
    <Input type='password' id='password' required name='password' border='1px solid #6896d9' marginBottom='1rem' onChange={handleInputChange}/>

    {/* Forgot Password? */}
    <Button borderRadius='10px' width='100%' background='#6896d9' type='submit'>Sign In</Button>
    </FormControl>
    </form>
    <Text>{loginError ? loginError.error : 'Success'}</Text>
    </Box>
  )
}

export default LoginCard