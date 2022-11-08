import { Component, react } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import logo from '../../img/logo-dark.png'
import { useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'

const PageError = () => {

    const { code } = useParams()
    var text = ''
    if (code === '404') {
        text = 'Page not found'
    }
    else {
        text = 'We are having a problem with the server, please try again later'
    }
    return (
        <>
            <Box textAlign={'center'} sx={{ minHeight: '85vh' }}>
                <Box mt={2} >
                    <img src={`${logo}`} width={'100px'}></img>
                </Box>
                <Typography variant='h2' color={'primary'}>
                    Error
                </Typography>
                <Typography variant='h1'>
                    {code}
                </Typography>
                <Typography variant='h5'>
                    {text}
                </Typography>

            </Box>
            <Footer />
        </>
    )

}

export default PageError
