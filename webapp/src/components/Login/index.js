// import React, {Component} from "react"
// import { Link, Route } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import {withStyles, FormLabel, RadioGroup, FormControlLabel, Radio, Dialog, DialogTitle, FormControl, Fab, Button} from '@material-ui/core'
// import '../bootstrap.min.css'
// import './login.css';

// const styles = theme => ({
//     formControl: {
//         margin: theme.spacing(2),
//         marginLeft: theme.spacing(10),
//     }
// })

// class Login extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
            
//         }
//     }

//     render(){
//       function checkuser(name,pass){
//         return true;
//         };

//       function check(){
//         let name = document.getElementById('username').value;
//         let pass = document.getElementById('userpass').value;
//         if(checkuser(name,pass)==true){
//         } else {
//             alert("Wrong user or password, please input again!");
//         }
//       };

//         const {classes} = this.props

//         return(
//         <div id="register">
//             <div id="box">
//                 <h1 className="centering"> Hệ Thống Quản Lý <br/> Phòng Học </h1>
//                 <div>
//                     <input type="text" placeholder="user name" id='username' className="form-control my-4 py-3" style={{margin: "0 auto"}} />
//                     <input type="pass" placeholder="password"  id='userpass' className="form-control my-4 py-3" style={{margin: "0 auto"}} />
//                     <button className="btn btn-warning" style={{marginLeft: "270px", marginTop: "10px"}} onClick={this.check}>
//                         <Link to="/room-manager">Đăng Nhập</Link>
//                     </button>
//                 </div>
//                 <div>
//                     <p className="textcontent">Bạn chưa có tài khoản?</p>
//                     <button className="btn-outline-primary btn mt-2" style={{float:"left"}}>
//                         <Link to="/signup">Đăng Kí</Link>
//                     </button>
//                 </div>
//                 <div style={{clear:"both"}}> 
//                     <button className="buttonnoneborder">Quên Mật Khẩu</button>
//                 </div>
//             </div>
//         </div>);
//     }
// }

// Login.propTypes = {
//     classes: PropTypes.object.isRequired
// }

// export default withStyles(styles)(Login)

import React, {useState, Fragment} from "react";
import { Link, Redirect } from 'react-router-dom';
// import logoImg from "../img/logo.jpg";
import {useAuth} from '../../context/auth';
import {login} from '../../api/index';
import { Box } from "@material-ui/core";
import '../bootstrap.min.css'
import './login.css';

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    
    const postLogin = () => {
        login({username: userName, password: password}).then(result => {
            switch(result.status) {
                case 200: {
                    localStorage.setItem('tokenjwt', result.data.token)
                    console.log("Local: ", localStorage.getItem("tokenjwt"))
                    setAuthTokens(result.data.token);
                    setLoggedIn(true);
                    break;
                }
                case 403: {
                    setIsError(true);
                }
                default: setIsError(true);
            }
        }).catch(e => {
          setIsError(true);
        });
    }

    if (isLoggedIn) {
    return (<Fragment><Redirect to="/" /> </Fragment>);
    }
    return (
        <div id="register">
            <div id="box">
                <h1 className="centering"> Management System Classroom</h1>
                <div>
                    <input 
                        onChange={e => { setUserName(e.target.value)}} 
                        type="text" 
                        placeholder="user name" 
                        id='username' 
                        value={userName}
                        className="form-control my-4 py-3" 
                        style={{margin: "0 auto"}} />
                    <input 
                        onChange={e => {setPassword(e.target.value)}}
                        value={password}
                        type="password" 
                        placeholder="password"  
                        id='userpass' 
                        className="form-control my-4 py-3" 
                        style={{margin: "0 auto"}} />
                    <button className="btn btn-warning" style={{marginLeft: "300px", marginTop: "10px"}} onClick={postLogin}>
                       LOGIN
                    </button>
                    {isError && 
                        <Box component="div" style={{color:'red'}}>User or Password is incorrect</Box>
                    }
                </div> 
            </div>
        </div>
    );
}

export default Login;