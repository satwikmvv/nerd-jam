import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Yap from '../components/Yap';
import Profile from '../components/Profile';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getYaps } from '../redux/actions/dataActions';
export class home extends Component {

    componentDidMount() {
        this.props.getYaps()
    }
    render() {
        const { yaps, loading } = this.props.data;
        let recentYapMarkup = !loading ? (
            yaps.map(yap => <Yap key={yap.yapId} yap={yap} />)
        ) : <p>Loading...</p>
        return (
            <Grid container justify="center" spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentYapMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getYaps: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getYaps })(home)
