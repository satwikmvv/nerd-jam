import React from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';


//MUI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';


//ICONS
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({
    ...theme.customStyles
})

const ProfileSkeleton = (props) => {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImg} alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handleProfileSkeleton} />
                    <hr />
                    <div className={classes.fullLineSkeleton} />
                    <div className={classes.fullLineSkeleton} />
                    <hr />
                    <LocationOn color="primary"/> <span>Location</span>
                    <hr />
                    <LinkIcon color="primary" /> https://website.com
                    <hr />
                    <CalendarToday color="primary" /> Joined date

                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
