import { react, Component } from 'react'
import { Box } from '@mui/system'
import { Button, Container, InputLabel, TextField, Typography } from '@mui/material'

//ICONS MUI
import BadgeIcon from '@mui/icons-material/Badge';

class UserDataRegistration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: undefined
        }
    }
    handleChangeInput(e) {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }
    sendDataUser(e) {

    }
    render() {
        return (
            <>
                <Box>
                    <Container>
                        <Box>
                            <Typography>Please enter your details below to continue</Typography>
                        </Box>
                        <Box>
                            <BadgeIcon />
                        </Box>
                        <Box component={'form'}>
                            <TextField label='firstName' name="firstName" value={this.state.firstName} onChange={(e) => this.handleChangeInput(e)} />
                            <Button variant='contained' >Register</Button>
                        </Box>
                    </Container>
                </Box>
            </>
        )
    }
}

export default UserDataRegistration