import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Component, React } from "react";

//ICONS
import { GitHub, LinkedIn, WhatsappOutlined } from '@mui/icons-material/';

//CSS
import './style/style.css'

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <>
                <Box bgcolor={this.props.bgColor} component={'footer'} sx={{ width: '100%' }}>

                    <Box justifyContent='center' display='flex'>
                        <Divider sx={{ bgcolor: `${this.props.colorDivider}`, mb: 1, width: '80%' }} />
                    </Box>
                    <Box justifyContent='center' display='flex'>
                        <Box justifyContent='space-between' display='flex' width={150}>
                            <a href="https://github.com/jox404"><GitHub sx={{ fontSize: 35, color: '#fff' }} /></a>
                            <a href="https://www.linkedin.com/in/joaocosta105/"><LinkedIn sx={{ fontSize: 35, color: '#0a66c2' }} /></a>
                            <a href="https://wa.me/5511987984340"><WhatsappOutlined sx={{ fontSize: 35, color: '#069A8E' }} /></a>
                        </Box>
                    </Box>
                    <Box justifyContent='center' display='flex' >
                        <Typography color={this.props.color} variant="body2">Copyright ©Your Website 2022.</Typography>
                    </Box>
                </Box>
            </>
        )
    }



}

export default Footer