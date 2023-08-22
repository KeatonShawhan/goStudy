import { Box, FormControl, FormLabel, Input, Text, Link, Button } from '@chakra-ui/react'

const LoginCard = () => {
  return (
    <Box width='100%' overflow='hidden' background='gray.700' borderRadius='5px' padding='2rem'>
    <Text color='#cfd9e8' fontWeight='bold' fontSize='2xl'>WELCOME BACK!</Text>
    <Text fontSize='2xs' marginBottom='1rem'>Don't have an account? <Link color='#6896d9'>Sign up</Link></Text>
    <FormControl marginBottom='1rem'>
    <FormLabel color='#cfd9e8'>Email</FormLabel>
    <Input type='email' marginBottom='1rem' border='1px solid #6896d9'/>
    <FormLabel color='#cfd9e8'>Password</FormLabel>
    <Input type='password' border='1px solid #6896d9' marginBottom='1rem'/>
    <Link marginBottom='1.5rem' fontSize='2xs' display='flex' justifyContent='right' color='#6896d9'>Forgot Password?</Link>
    <Button borderRadius='10px' width='100%' background='#6896d9'>Sign In</Button>
    </FormControl>
    </Box>
  )
}

export default LoginCard