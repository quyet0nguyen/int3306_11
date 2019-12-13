import bcrypt from 'bcrypt'


const salt = bcrypt.genSaltSync(10);


const constant = {
    salt: salt,
};

export default constant