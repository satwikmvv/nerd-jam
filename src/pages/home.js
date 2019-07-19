import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Yap from '../components/Yap'
export class home extends Component {
    state = {
        yaps: null
    }

    componentDidMount() {
        axios.get('/yaps')
        .then(res => {
            console.log(res)
            this.setState({
                yaps: res.data
            })
        })
        .catch(err => console.log(err))
    }
    render() {
        let recentYapMarkup = this.state.yaps ? (
            this.state.yaps.map(yap => <Yap key={yap.yapId} yap={yap} />)
        ) : <p>Loading...</p>
        return (
            <Grid container justify="center" spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentYapMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
