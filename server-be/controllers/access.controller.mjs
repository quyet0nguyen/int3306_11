import AccountHelper from '../helpers/account.helper.mjs'
import jwt from 'jsonwebtoken'

import secret from '../config/key.mjs'
const login = (req, res) => {
    // if (JSON.stringify(req.body) == "{}") {
    //     return res.status(400).json({ Error: "Register request body is empty" });
    //   }
    //   if (!req.body.email || !req.body.username || !req.body.password) {
    //     return res.status(400).json({ Error: "Missing fields for registration" });
    //   }
    let username = req.body.username
    let password = req.body.password
    console.log(username, password)
    if(username && password ) {

        AccountHelper.checkAccount({
            username: req.body.username,
            password: req.body.password,
        }).then(result => {
            if(result !== undefined ) {
                let token = jwt.sign({username: result.username}, secret, {expiresIn: '24h'})
                res.status(200).json({
                    success: true,
                    data: result,
                    token: token,
                    message: "ok"
                })
            } else {
                res.status(403).json({
                    success: false,
                    data: null,
                    message: "Incorrect username or password"
                })
            }
            
        })  
    } else {
        res.status(400).json({
            success: false,
            data: null,
            message: "Authentication failed!"
        })
    }

}


const AccessController = {
    login
}

export default AccessController