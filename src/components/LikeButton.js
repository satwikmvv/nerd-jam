import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

//Redux
import { connect } from 'react-redux';
import { likeYap, unlikeYap } from '../redux/actions/dataActions'


export class LikeButton extends Component {
    likedYap = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.yapId === this.props.yapId))
            return true
        else
            return false
    }
    likeYap = () => {
        this.props.likeYap(this.props.yapId)
    }
    unlikeYap = () => {
        this.props.unlikeYap(this.props.yapId)
    }
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to='/login'>
                <MyButton tip="Like">
                    <FavoriteBorder color="primary"/>
                </MyButton>
            </Link>
        ) : (
            this.likedYap() ? (
                <MyButton tip="Undo like" onClick={this.unlikeYap}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeYap}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        )
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    yapId: PropTypes.string.isRequired,
    likeYap: PropTypes.func.isRequired,
    unlikeYap: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeYap,
    unlikeYap
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
