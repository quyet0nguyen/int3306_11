import React, {Component} from "react"
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import {withStyles, FormLabel, RadioGroup, FormControlLabel, Radio, Dialog, DialogTitle, FormControl, Fab, Button} from '@material-ui/core'
import '../bootstrap.min.css'
import './login.css';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(10),
    }
})

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render(){
      function checkuser(name,pass){
        return true;
        };

      function check(){
        let name = document.getElementById('username').value;
        let pass = document.getElementById('userpass').value;
        if(checkuser(name,pass)==true){
        } else {
            alert("Wrong user or password, please input again!");
        }
      };

        const {classes} = this.props

        return(
        <div id="register">
            <div id="box">
                <h1 className="centering"> Hệ Thống Quản Lý <br/> Phòng Học </h1>
                <div>
                    <input type="text" placeholder="user name" id='username' className="form-control my-4 py-3" style={{margin: "0 auto"}} />
                    <input type="pass" placeholder="password"  id='userpass' className="form-control my-4 py-3" style={{margin: "0 auto"}} />
                    <button className="btn btn-warning" style={{marginLeft: "270px", marginTop: "10px"}} onClick={this.check}>
                        <Link to="/room-manager">Đăng Nhập</Link>
                    </button>
                </div>
                <div>
                    <p className="textcontent">Bạn chưa có tài khoản?</p>
                    <button className="btn-outline-primary btn mt-2" style={{float:"left"}}>
                        <Link to="/signup">Đăng Kí</Link>
                    </button>
                </div>
                <div style={{clear:"both"}}> 
                    <button className="buttonnoneborder">Quên Mật Khẩu</button>
                </div>
            </div>
        </div>);
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)