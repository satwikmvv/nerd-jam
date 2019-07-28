import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';


//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


//ICONS
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Redux
import { connect } from 'react-redux';
import { getYap, clearErrors } from '../../redux/actions/dataActions';



const styles = (theme) => ({
    ...theme.customStyles    
})
class YapDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }

    componentDidMount() {
        if(this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const {userHandle,yapId}=this.props;
        const newPath = `/users/${userHandle}/yap/${yapId}`;

        if(oldPath === newPath) {
            oldPath = `/users/${userHandle}`
        }

        window.history.pushState(null,null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getYap(this.props.yapId);
    }
    handleClose = () => {
        window.history.pushState(null,null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    }

    render() {
        const { classes, yap: { yapId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI: { loading }} = this.props;
        
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container >
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton yapId={yapId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm yapId={yapId} />
                <Comments comments={comments} />
            </Grid>
        )

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand Yap" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

YapDialog.propTypes = {
    getYap: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    yapId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    yap: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    yap: state.data.yap,
    UI: state.ui
})

const mapActionsToProps ={ 
    getYap,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(YapDialog))
