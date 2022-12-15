import { useEffect, useState } from 'react';
import '../styles/Login.module.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../store/auth/authSlice'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

function Login(props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [code, setCode] = useState('')
    // const [password, setPassword] = useState('')
    // const [errmsg, setErrmsg] = useState(null)
    const { message, isError, isSuccess, studentId, user, email } = useSelector((state) => state.auth)

    useEffect(() => {
        if(message){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Success")
        }
        if(user){
            // console.log("user hai")
            // toast.success("succcess")
            router.push('/vote')
        }
        if(!studentId){
            router.push('/')
        }
        dispatch(reset())
    },[message, isError, isSuccess, user, studentId])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({studentId, code}))
        // console.log(email)
        // console.log(password)
        // if(!email || !password){
        //     setErrmsg('Please enter all fields.')
        //     return
        // }
        // const user = {
        //     email,
        //     password
        // }
        // dispatch(login(user))
    }

    // useEffect(() => {
    //     setErrmsg(msg.msg)
    // },[msg])

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm-6 text-black">
                        <br/>

                        <div className="px-5 ms-xl-4">
                        {/* <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{color: "#709085"}}></i> */}
                        <img src="https://media.glassdoor.com/sqll/540401/jamia-millia-islamia-squarelogo-1463577650514.png" style={{width: "10%", marginBottom: "25px"}}/>
                        <span className="h1 fw-bold mb-0"> JMI Voting</span>
                        </div>
                        
                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                        
                        <form onSubmit={onSubmit}>
                            {/* {errmsg && errmsg != "No token, Unauthorised accesss" &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <button 
                                    type="button" 
                                    className="close" 
                                    data-dismiss="alert" 
                                    aria-label="Close"
                                    onClick={() => setErrmsg(null)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            } */}

                            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Enter Code To Log In</h3>

                            <div className="form-outline mb-4">
                            <input 
                                type="text" 
                                id="form2Example18" 
                                className="form-control form-control-lg" 
                                placeholder='Code'
                                onChange={(e) => setCode(e.target.value)}
                                value={code}
                            />
                            <label className="form-label" htmlFor="form2Example18">Code sent on - <span style={{color:'green'}}>{email}</span></label>
                            </div>

                            {/* <div className="form-outline mb-4">
                            <input 
                                type="password" 
                                id="form2Example28" 
                                className="form-control form-control-lg" 
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <label className="form-label" htmlFor="form2Example28">Password</label>
                            </div> */}

                            <div className="pt-1 mb-4">
                            <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                            </div>

                            {/* <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
                            <p>Don't have an account? <a href="#!" className="link-info">Register here</a></p> */}

                        </form>

                        </div>

                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img src="https://www.ubisecure.com/wp-content/uploads/2019/12/General-Election-piece.png" alt="Login image" className="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}}/>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;