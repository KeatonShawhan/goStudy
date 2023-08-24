import { FormControl, FormLabel, Input, Button, Box, Text } from "@chakra-ui/react"

const CreateUserCard = () => {
  return (
    <Box width='100%' display='flex' justifyContent='center' alignItems='center' marginTop='1rem'>
      <Box  width='30rem' background='gray.700' borderRadius='5px' padding='2rem' marginBottom='1rem'>
        <Text color='#cfd9e8' fontWeight='bold' fontSize='2xl' textAlign='center' marginBottom='2rem'>CREATE USER</Text>
        <FormControl marginBottom='1rem'>
        <FormLabel color='#cfd9e8'>Email</FormLabel>
        <Input type='email' marginBottom='1rem' border='1px solid #6896d9' />
        <FormLabel color='#cfd9e8'>Create Password</FormLabel>
        <Input type='password' border='1px solid #6896d9' marginBottom='1rem' />
        <FormLabel color='#cfd9e8'>Confirm Password</FormLabel>
        <Input type='password' border='1px solid #6896d9' marginBottom='2rem' />
        <Button borderRadius='10px' width='100%' background='#6896d9'>Sign In</Button>
        </FormControl>
      </Box>
    </Box>
    
  )
}

export default CreateUserCard