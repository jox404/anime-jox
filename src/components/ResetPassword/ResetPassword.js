import { Component } from 'react'

/* FIREBASE */
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
/* MUI */
import { Alert, AlertTitle, Button, IconButton, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

/* CSS */
import './style/style.css'
import { Close } from '@mui/icons-material'

/* IMAGES */
import logoDark from '../../img/logo-dark.png'


class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            errorEmptyInput: false, /* vai ser removido */
            renderAlert: 'none',
            alertText: {
                title: '', body: ''
            }, alertType: 'error'

        }
    }

    handleChange(e) {
        const value = e.target.value

        this.setState({
            email: value
        })
    }

    printAlert(title, body, type) {
        this.setState({
            renderAlert: 'flex',
            alertText: {
                title: title, body: body
            }, alertType: type
        })
    }

    handleResetPassword() {
        const auth = getAuth()
        sendPasswordResetEmail(auth, this.state.email).then((res) => {
            this.printAlert('We send a link for', 'Please Virify your Email Address', 'success')
        }).catch((error) => {
            this.printAlert('Email address Is Not Valid', "We Coundn't Find An Account With This Address Email", 'warning')
        })
    }

    handleValidateInput() {
        if (this.state.email !== '') {
            console.log('tudo certo')
            this.handleResetPassword()
        } else {
            this.printAlert('Empty Field', 'The Field been Empty', 'error')
        }
    }
    closeAlert() {
        this.setState({
            renderAlert: 'none'
        })
    }

    render() {
        return (
            <>
                <Box display={this.state.renderAlert} className={'alertContainer'} >
                    <Alert severity={`${this.state.alertType}`} className='alert'>
                        <AlertTitle className='alertTitle'>{this.state.alertText.title}
                            <IconButton onClick={() => this.closeAlert()} size={'small'}>
                                <Close />
                            </IconButton>
                        </AlertTitle>{this.state.alertText.body}
                    </Alert>
                </Box>
                <Box className={'formContainer'}>
                    <img src={logoDark} />
                    <Typography variant='h1'>
                        Reset Your Password
                    </Typography>
                    <Typography>
                        Enter the email address asssociated with your account and we'll send you a link to reset your password
                    </Typography>


                    <Box className={'form'}>
                        <Box className={'inputContainer'}>
                            <TextField label='Email Adress' value={this.state.email} onChange={(e) => this.handleChange(e)} fullWidth />
                        </Box>
                        <Box>
                            <Button variant={'contained'} onClick={() => this.handleValidateInput()} fullWidth>Send Code</Button>
                        </Box>
                    </Box>
                    <Box className={'link'}>
                        <Link href='/anime-jox/#/signup'>Don't have an account? Sign Up!</Link>
                    </Box>
                </Box>
            </>
        )
    }
}

export default ResetPassword