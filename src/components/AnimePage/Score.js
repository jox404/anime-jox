import { Star } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Component, react } from 'react'

//CSS
import './style/style.css'

class Score extends Component {
    constructor(props) {
        super(props)

        this.state = {
            starsRating: [20, 40, 60, 80, 100]
        }
    }
    componentDidMount() {
    }
    render() {
        var averageRating = this.props.averageRating
        averageRating = ((Math.floor(averageRating * 100) / 100) / 10).toString()
        averageRating = averageRating == '10' ? '10' : averageRating.substring(0, 3)

        return (
            <>
                <Box
                    sx={{
                        float: 'right',
                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' }, backgroundColor: '#191919', maxHeight: '100px'
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
                        {averageRating}
                    </Typography>
                    <Box
                        sx={{ justifyContent: 'space-around', display: 'flex' }}
                    >
                        <Box>
                            {
                                this.state.starsRating.map((star, index) => {
                                    const averageRating = parseInt(this.props.averageRating)
                                    if (star <= averageRating) {
                                        return <Star color='yellow' key={index} />
                                    } else {
                                        return <Star color='' key={index} />
                                    }
                                })
                            }
                        </Box>
                    </Box>
                </Box>
            </>
        )
    }
}

export default Score