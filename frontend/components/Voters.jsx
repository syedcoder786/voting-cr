import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch, useSelector } from 'react-redux'
import { voteUser } from '../store/auth/authSlice'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Voters = () => {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onVote = (e,voteTo) => {

        confirmAlert({
            title: `Vote to ${e.target.name}`,
            message: `Would You like to vote ${e.target.name}`,
            buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    // alert('Click Yes')
                    console.log("you clicked it")
                    console.log(voteTo)
                    dispatch(voteUser({voteTo, studentId: user.studentId}))
                }
            },
            {
                label: 'No',
                // onClick: () => alert('Click No')
            }
            ]
        });

    }

  return (
    <div style={{ backgroundColor:"#202124", padding:"20px", width:"90%", margin:"auto", borderRadius:"10px"}}>
        <h1 style={{color:"silver"}}><center>Vote Now</center></h1><br/>
        <div style={{display:"flex", justifyContent:"center", gap: "5%", alignItems:"center", color:"white", overflowX: "hidden"}}>
            <div className="card" style={{width: "28rem", backgroundColor:"#303134"}} data-aos="fade-right" data-aos-delay="250">
                <img src="/ashar.jpg" className="card-img-top" alt="/favicon.ico" style={{padding:"15px"}}/>
                <div className="card-body">
                    <h5 className="card-title"><center>Md Ashar</center></h5>
                    <p className="card-text">
                    <center>
                        3rd Year (5th semester)
                        <p className="card-text">Btech(Ece). JMI</p>
                    </center>
                    </p>
                    {!user.voted && 
                        <button className="btn btn-primary" style={{width:"100%"}} 
                            onClick={(e) => onVote(e,1)}
                            name='Md Ashar'
                        >Vote</button>
                    }
                </div>
            </div>
            <div><h1 style={{color:"silver"}}>Vs</h1></div>
            <div className="card" style={{width: "28rem", backgroundColor:"#303134"}} data-aos="fade-left" data-aos-delay="250">
                <img src="/farzan.jpg" className="card-img-top" alt="/favicon.ico" style={{padding:"15px"}}/>
                <div className="card-body">
                    <h5 className="card-title"><center>Farzan Ahamd</center></h5>
                    <p className="card-text">
                    <center>
                        3rd Year (5th semester)
                        <p className="card-text">Btech(Ece). JMI</p>
                    </center>
                    </p>
                    {!user.voted && 
                        <button className="btn btn-primary" style={{width:"100%"}} 
                            onClick={(e) => onVote(e,1)}
                            name='Farzan'
                        >Vote</button>
                    }
                </div>
            </div>
        </div>
        <br/>
    </div>
  )
}

export default Voters