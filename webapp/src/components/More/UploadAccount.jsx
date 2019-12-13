import React, {Component} from 'react' 
import { FormControl, FormLabel, Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
const styles = theme => ({
    formControl: {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(10),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
})

class UploadAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            uploadSuccess: null
        };
      
        // this.onChange = this.onChange.bind(this)
    }


    onChange(event) {
        let file = event.target.files[0]
        this.setState({file: file})
    }

    onSubmit(file, importFunction) {
        let bodyFormData = new FormData()
        bodyFormData.set('file', file)

        importFunction({
            formData: bodyFormData,
            role: this.props.roleValue
        })
    }

    render() {
        const {classes} = this.props;

        const {file} = this.state;
        console.log(file)
        return (
        <div className="Upload">
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">File</FormLabel>
                <input
                    className={classes.input}
                    id="text-button-file"
                    type="file"
                    onChange={e => this.onChange(e)}
                />
                <label htmlFor="text-button-file">
                    <Button 
                        component="span" 
                        className={classes.button}
                        variant="outlined"
                    >
                        Choose file
                    </Button>
                </label>
                {file !== null &&
                    <Box component="div" style={{paddingLeft: 10}}>{file.name}</Box>
                }

                <Button
                    className={classes.button}
                    variant="outlined"
                    disabled={file === null}
                    onClick={() => this.onSubmit(this.state.file, this.props.onImportAccounts)}
                >
                    Upload
                </Button>
            </FormControl>
        </div>
        )
    }
}

UploadAccount.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UploadAccount)