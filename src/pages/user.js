import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Yap from '../components/yap/Yap';
import StaticProfile from '../components/profile/StaticProfile';

//MUI
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';



export class user extends Component {

    state = {
        profile: null
    }

    componentDidMount(){
        const handle = this.props.match.params.handle; //fetching from route url
        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
        .then(res => {
            this.setState({
                profile: res.data.user
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        const { yaps, loading } = this.props.data;

        const yapsMarkup = loading ? (
            <p>Loading ...</p>
        ) : (yaps == null ? (
            <p>This user hasn't yapped yet</p>
        ) : (
            yaps.map(yap => <Yap key={yap.yapId} yap={yap}/>)
        ))

        return (
            <Grid container justify="center" spacing={2}>
                <Grid item sm={8} xs={12}>
                    {yapsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <p>Loading ...</p>
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(user);
