// import axios from "axios"

// // LOGIN API CALL EXAMPLE
// const loginData ={ // obv fill it with whatever data you get from frontend, but this is what its expecting
//     username: '',
//     password: ''
// }
// const loginRequest = () => {
//     axios // make API Request                   
//     .post(`${hostName}/api/login`, loginData, {
//         headers: {
//         'Content-Type': 'application/json'
//         }
//     })
//     .then((res) => {
//         // this will give you the token in a json object, so put it in local storage
//         localStorage.setItem('token', res.data.token)
//         console.log(res)
//     })
//     // do smth with error if it happens
//     .catch(err => setError(err)) 
// }


// // CREATE STUDY GROUP API EXAMPLE
// const studyGroupData = { // obv fill it with whatever data you get from frontend, but this is what its expecting
//     group_name: '',
//     subject: ''
// }
// const createStudyGroupRequest = () => {
//     axios // make API Request                   
//     .post(`${hostName}/api/create-study-group`, studyGroupData, {
//         headers: {
//         'Content-Type': 'application/json',
//         // This thing below is the header for how you pass in the token to a protected endpoint
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     })
//     .then((res) => {
//         // successful request gives you this json obj { message: 'Study group created', group_id: groupId }
//         // do what you need to with that info, like redirect to that study group page
//         console.log(res)
//     })
//     // do smth with error if it happens, look at the endpoint in routes.js for specific error code meanings or ask Luca
//     .catch(err => setError(err))
// }


// // DELETE STUDY GROUP API EXAMPLE
// const joinStudyGroupData = { // obv fill it with whatever data you get from frontend, but this is what its expecting
//     groupId = '',
//     userId = ''
// }

// const joinStudyGroupRequest = () => {
//     axios // make API Request                   
//     .delete(`${hostName}/api/delete-study-group/:${joinStudyGroupData.groupId}`, joinStudyGroupData, {
//         headers: {
//         'Content-Type': 'application/json',
//         // This thing below is the header for how you pass in the token to a protected endpoint
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     })
//     .then((res) => {
//         // successful request gives you this json obj { message: 'Study group deleted' }
//         // do what you need to with that info, like redirect to off of that study group page
//         console.log(res)
//     })
//     // do smth with error if it happens, look at the endpoint in routes.js for specific error code meanings or ask Luca
//     .catch(err => setError(err))
// }

