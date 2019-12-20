import jwt from 'jsonwebtoken'
import secret from '../config/key.mjs'

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
    // console.log("Token: ", token)
    if(token !== undefined) {
            if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        if (token) {
            console.log(token)

            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log("decode")
                    return res.status(405).json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    console.log("Next")
                    req.decoded = decoded;
                    next();
                    return;
                }
            });
        } else {
            return res.status(403).json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    }
};
  
const authentication = {
    checkToken: checkToken,
}
export default authentication;