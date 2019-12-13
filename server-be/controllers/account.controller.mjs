import AccountHelper from '../helpers/account.helper.mjs'
import fs from 'fs'
import XLSX from 'xlsx'

const create = (req, res) => {
    // if (JSON.stringify(req.body) == "{}") {
    //     return res.status(400).json({ Error: "Register request body is empty" });
    //   }
    //   if (!req.body.email || !req.body.username || !req.body.password) {
    //     return res.status(400).json({ Error: "Missing fields for registration" });
    //   }

    AccountHelper.create(req.body).then(result => {
        if(result.err) {
            console.error(result.err)
            res.json({
                success: false,
                data: undefined,
                message: "not ok!"
            })
            return
        }
        res.json({
            success: true,
            data: result.createdAccount,
            message: "ok"
        })
    })    

}

const getAll = (req, res) => {

    AccountHelper.retrieveAll().then(result => {
        if(result.err) {
            console.log(result.err)
            res.json({
                success: false,
                data: undefined,
                message: "not ok"
            })
            return
        }
        res.json({
            success: true,
            data: result.accounts,
            message: "ok"
        })
     })
}

const update = (req, res) => {
    
    let id = parseInt(req.params.id)
    let infoUpdate = req.body

    AccountHelper.update(id, infoUpdate).then(result => {
        if(result.err) {
            console.log(result.err)
            res.json({
                success: false,
                data: undefined,
                message: "not ok"
            })
            return
        }
        res.json({
            success: true,
            data: undefined,
            message: "ok"
        })
    })
}

const removeByID = (req, res) => {
    
    let id = parseInt(req.params.id)
    AccountHelper.remove(id).then(result => {
        if(result.err) {
            console.log(result.err)
            res.json({
                success: false,
                data: undefined,
                message: "not ok"
            })
        }
        res.json({
            success: true,
            data: undefined,
            message: "ok"
        })
    })
}

const importStudentAccounts = (req, res) => {
    if(!req.files.file) {
        res.status(400).json({
            status: false,
            message: 'None file',
            data: undefined
        })
        return
    }

    let file = req.files.file;
    let fileName = req.files.file.name;



    file.mv('./uploads/' + fileName, (err) => {
        if(err) {
            console.log('error saving');
            res.json({
                status: false,
                message: 'Error file',
                data: undefined
            })
            return
        } else {
            console.log('Saved: ./uploads/' + fileName);
            try {
                let workbook = XLSX.readFile('./uploads/' + fileName)
                var sheet_name_list = workbook.SheetNames;
                let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {header:["id","code","name","dob"]})
                data.shift()
    
                let accounts = []
                data.forEach(item => {
                   accounts.push({
                       username: item.code,
                       password: item.code,
                       role: 'student',
                       name: item.name
                   }) 
                });
    
                // Remove file when read success
                try{
                    fs.unlinkSync('./uploads/' + fileName);
                } catch (e) {
                    console.log("error delete file");
                }
    
                AccountHelper.createMulti(accounts).then(result => {

                    res.json({
                        success: true, 
                        message: "ok",
                        fault: result.err,
                        data: result.createdAccounts
                    })

                    return
                })
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: "Server can't read file",
                    data: undefined
                })
                return
            }
        }
    });
}

const importLecturerAccounts = (req, res) => {
    if(!req.files.file) {
        res.status(400).json({
            status: false,
            message: 'None file',
            data: undefined
        })
        return
    }

    let file = req.files.file;
    let fileName = req.files.file.name;



    file.mv('./uploads/' + fileName, (err) => {
        if(err) {
            console.log('error saving');
            res.json({
                status: false,
                message: 'Error file',
                data: undefined
            })
            return
        } else {
            console.log('Saved: ./uploads/' + fileName);
            try {
                let workbook = XLSX.readFile('./uploads/' + fileName)
                var sheet_name_list = workbook.SheetNames;
                let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {header:["id","code","name"]})
                data.shift()
    
                let accounts = []
                data.forEach(item => {
                   accounts.push({
                       username: item.code,
                       password: item.code,
                       role: 'lecturer',
                       name: item.name
                   }) 
                });

                // Remove file when read success
                try{
                    fs.unlinkSync('./uploads/' + fileName);
                } catch (e) {
                    console.log("error delete file");
                }
    
                AccountHelper.createMulti(accounts).then(result => {

                    res.json({
                        success: true, 
                        message: "ok",
                        fault: result.err,
                        data: result.createdAccounts
                    })

                    return
                })
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: "Server can't read file",
                    data: undefined
                })
                return
            }
        }
    });
}

const AccountController = {
    create,
    update,
    getAll,
    removeByID,
    importStudentAccounts,
    importLecturerAccounts
}

export default AccountController