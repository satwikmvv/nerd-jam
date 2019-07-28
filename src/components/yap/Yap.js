import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteYap from './DeleteYap';
import YapDialog from './YapDialog';
import LikeButton from './LikeButton';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'

//ICONS
import ChatIcon from '@material-ui/icons/Chat';


//REDUX
import { connect } from 'react-redux';


const styles = theme => ({
    ...theme.customStyles
})

export class Yap extends Component {
    render() {
        dayjs.extend(relativeTime);

        //const classes = this.props.classes;
        const { classes, user: { authenticated, credentials: { handle } }, yap: {body, commentCount, likeCount, userHandle, userImage, yapId, createdAt} } = this.props; //destructuring
        
       

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
                    <LikeButton yapId={yapId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <YapDialog yapId={yapId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}

Yap.propTypes = {
    user: PropTypes.object.isRequired,
    yap: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Yap))
