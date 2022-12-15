import React from 'react';
import Box from '@material-ui/core/Box';
import CircularBar from './CircularBar';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useState } from 'react';
import { reset } from '../store/auth/authSlice';

function RectangleBox(props) {
    const dispatch = useDispatch()
    const { users, isLoading, message, isError, isSuccess } = useSelector((state) => state.auth);

    const [vote, setVote] = useState({
        totalVoted:0,
        voted1:0,
        voted2:0,
        percent:0,
    })

    useEffect(() => {
        const votedUsers = users.filter(user => { return user.voted === true  })

        const totalVoted = votedUsers.length

        let voted1 = votedUsers.filter(user => { return user.votedTo === 1 })

        voted1 = voted1.length

        let voted2 = totalVoted - voted1

        let percent = voted1/totalVoted * 100

        console.log(percent)
        setVote({totalVoted, voted1, voted2, percent})
        dispatch(reset())

    },[isSuccess])

    return (
        <div style={{width:"95%", margin: "auto", backgroundColor: "#202124", borderRadius:"10px", padding:"20px"}}>
                <h1 style={{color:"silver"}}><center>Score Board</center></h1><br/>
            <div style={{  display:'flex', justifyContent: "space-around", alignItems:"center" }}>
                <Box style={{backgroundColor:"palevioletred", padding:"10px", color:"white", borderRadius:"10px"}}>
                    <h3>Total Votes Given</h3>
                    <h1>{vote.totalVoted}</h1>
                    {/* <h2>10</h2> */}
                </Box>

                <Box style={{backgroundColor:"green", padding:"10px", color:"white", borderRadius:"10px"}}>
                    <h3>Md Ashar (Votes)</h3>
                    <h1>{vote.voted1}</h1>
                    {/* <h2>7</h2> */}
                </Box>

                <Box style={{backgroundColor:"#0d6efd", padding:"10px", color:"white", borderRadius:"10px"}}>
                    <h3>Farzan Ahmad (Votes)</h3>
                    <h1>{vote.voted2}</h1>
                    {/* <h2>3</h2> */}
                </Box>
                <CircularBar percent={vote.percent}/>
            </div>
        </div>
    );
}

export default RectangleBox;