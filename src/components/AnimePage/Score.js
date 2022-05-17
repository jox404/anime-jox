import { Star } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Component, react } from 'react'

//CSS
import './style/style.css'

class Score extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <>
                <Box
                    sx={{
                        float: 'right',
                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' }, backgroundColor: '#191919'
                    }}
                    className={'border'}
                >
                    <Typography
                        variant='h1'
                        sx={{
                            bgcolor: '#050505',
                            borderRadius: '2px 2px',
                            textAlign: 'center',
                            fontSize: 20,
                        }}
                    >
                        score
                    </Typography>
                    <Typography sx={{ textAlign: 'center', fontSize: 22 }}>
                        {this.props.rating}
                    </Typography>
                    <Box
                        sx={{ justifyContent: 'space-around', display: 'flex' }}
                    >
                        <Box>
                            <Star color='yellow' />
                            <Star color='yellow' />
                            <Star color='yellow' />
                            <Star color='yellow' />
                            <Star color='yellow' />
                        </Box>
                    </Box>
                    <Typography
                        sx={{ textAlign: 'center', fontSize: '15px' }}
                    >
                        Reviews {this.props.numberReviews}
                    </Typography>
                </Box>
            </>
        )
    }
}

export default Score