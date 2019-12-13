import React, {Component, forwardRef} from 'react'
import PropTypes from 'prop-types'
import MaterialTable, {MTableToolbar} from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip';
import {withStyles, FormLabel, RadioGroup, FormControlLabel, Radio, Dialog, DialogTitle, FormControl} from '@material-ui/core'
import UploadAccount from '../../More/UploadAccount';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const styles = theme => ({
    formControl: {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(10),
    }
})

class AccountPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            accounts: null,
            openImport: false,
            roleValue: "student"
        }

    }

    onCreateAccount = (data) => {
        this.props.onCreateAccount({
            username: data.username,
            password: data.password,
            name: data.name,
            role: data.role,
        })
    }
    
    handleOpenImport = () => {
        this.setState({openImport: true})
    }

    handleCloseImport = () => {
        this.setState({openImport: false})
    }

    handleChange = event => {
        this.setState({roleValue: event.target.value})
    };

    handleImportAccount = (data) => {
        this.props.onImportAccounts(data)

        this.setState({openImport: false})
    }

    onUpdateAccount = (newData, oldData) => {
        console.log(newData)
        this.props.onUpdateAccount({
            id: newData.id,
            body: {
                username: newData.username,
                role: newData.role,
                password: newData.password,
                name: newData.name
            }
        })
    }

    render() {
        console.log(this.props)
        const {accounts, classes} = this.props
        const {openImport, roleValue} = this.state

        const columns = [
            {title: 'ID', field: 'id', editable: 'never', hidden: true},
            {title: 'Username', field: 'username', type: 'string'},
            {title: 'Name', field: 'name', type: 'string'},
            {
                title: 'Password', field: 'password', type: 'string',
                editComponent: props => (
                    <TextField
                        type="password"
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                    />
                )
            },
            {
                title: 'Role', field: 'role', type: 'string', 
                lookup: { 'admin': 'Admin', 'student': 'Student', 'lecturer': 'Lecturer' }    
            },
        ]
       
        if(accounts !== null) {
            accounts.map((item, index) => {
                if(item.tableData !== undefined) 
                item.tableData.editing = undefined
                item.password = '*******'
                return item
            })
            // console.log(accounts)

        }
        return (
            <div>
                {(accounts !== null || accounts.length === 0) && 
                <MaterialTable
                    icons={tableIcons}
                    title="Account Manager"
                    columns={columns}
                    data={accounts}
                    editable={{
                        onRowAdd: newData => 
                            new Promise(resolve => {
                                setTimeout(() =>  {
                                    this.onCreateAccount(newData)
                                    resolve();
                                }, 600)
                            }),
                        onRowUpdate:  (newData, oldData) => 
                            new Promise(resolve => {
                               
                                setTimeout(() => {
                                    this.onUpdateAccount(newData, oldData)
                                    resolve()
                                }, 600)
                            }),
                        onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                                console.log("Delete: ")
                            }, 600);
                        }),
                    }}
                    options={{
                        actionsColumnIndex: -1
                    }}
                    components={{
                        Toolbar: props => (
                          <div>
                            <MTableToolbar {...props} />
                            <div style={{padding: '0px 10px'}}>
                              <Chip 
                                label="Import" 
                                color="primary" 
                                style={{marginRight: 5}}
                                onClick={this.handleOpenImport}
                                variant="outlined"
                                />
                             
                            </div>
                          </div>
                        ),
                    }}

                />
            }

            <Dialog 
                onClose={this.handleCloseImport} 
                aria-labelledby="simple-dialog-title" 
                open={openImport}
                fullWidth={"sm"}
                maxWidth={"sm"}
                >
                <DialogTitle id="simple-dialog-title">Import Accounts</DialogTitle>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Role</FormLabel>
                    <RadioGroup aria-label="role" name="role" value={roleValue} onChange={this.handleChange}>
                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                        <FormControlLabel value="lecturer" control={<Radio />} label="Lecturer" />
                    </RadioGroup>
                </FormControl>
                <UploadAccount 
                    roleValue={roleValue}
                    onImportAccounts={this.handleImportAccount}    
                />
               
            </Dialog>
            </div>
        )
    }
}

AccountPage.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AccountPage)