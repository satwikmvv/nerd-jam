import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteYap from './DeleteYap';
import YapDialog from './YapDialog';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'

//ICONS
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


//REDUX
import { connect } from 'react-redux';
import { likeYap, unlikeYap } from '../redux/actions/dataActions'


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom:20
    },
    image:{
        minWidth:200,
        objectFit: 'cover'
    },
    content: {
        padding:25,
        objectFit: 'cover'
    }
}

export class Yap extends Component {
    likedYap = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.yapId === this.props.yap.yapId))
            return true
        else
            return false
    }
    likeYap = () => {
        this.props.likeYap(this.props.yap.yapId)
    }
    unlikeYap = () => {
        this.props.unlikeYap(this.props.yap.yapId)
    }
    render() {
        dayjs.extend(relativeTime);

        //const classes = this.props.classes;
        const { classes, user: { authenticated, credentials: { handle } }, yap: {body, commentCount, likeCount, userHandle, userImage, yapId, createdAt} } = this.props; //destructuring
        
        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to='/login'>
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
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

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteYap yapId={yapId} />
        ) : null
        return (
            <Card className={classes.card}> 
                <CardMedia 
                    className={classes.image}
                    image={userImage}
                    title="Profile image"
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1" >{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <YapDialog yapId={yapId} userHandle={userHandle}/>
                </CardContent>
            </Card>
        )
    }
}

Yap.propTypes = {
    likeYap: PropTypes.func.isRequired,
    unlikeYap: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    yap: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeYap,
    unlikeYap
}

export default connect(mapStateToProps, mapActionsToProps )(withStyles(styles)(Yap))
