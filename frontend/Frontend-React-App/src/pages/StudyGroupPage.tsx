import { Box, Grid, GridItem, List } from "@chakra-ui/react"

// interface Props {
//   group_id: number;
//   username: string;
// }



const StudyGroupPage = () => {

  // const joinStudyGroupRequest = (groupJoin: StudyGroup) => {
  //   axios.post(
  //     `${hostName}/api/join-study-group/${groupJoin.group_id}`,
  //     {},
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //     .then(() => {
  //         // successful request gives you this json obj { message: 'Study group deleted' }
  //         // do what you need to with that info, like redirect to off of that study group page
  //        getMyStudyGroups();
  //        getStudyGroups();
  //     })
  //     // do smth with error if it happens, look at the endpoint in routes.js for specific error code meanings or ask Luca
  //     .catch(err => {
  //       setError(err);
  //       console.log(groupJoin.group_id);
  //     }
  //       )
  // }

  return (
    <Box width='100%' height='100%'>
    <Grid templateColumns='repeat(2, 50%)'>
        <GridItem>
          <Box width='100%' height='100%'>
            <List></List>
          </Box>
        </GridItem>
        <GridItem display='flex' justifyContent='center' alignItems='center'></GridItem> 
    </Grid>
  </Box> 
  )
}

export default StudyGroupPage