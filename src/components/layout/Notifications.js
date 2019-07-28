import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';


//MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

//Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

//Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
    state={
        anchorEl: null
    };

    handleOpen = event => {
        this.setState({ anchorEl: event.target });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(nt =>!nt.read)
            .map(nt=> nt.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationIcon;
        if(notifications && notifications.length > 0) {
            (notifications.filter(nt => !nt.read).length > 0) ? (
                notificationIcon = (
                    <Badge 
                    badgeContent={notifications.filter(nt => !nt.read).length}
                    color="secondary">
                        <NotificationsIcon />
                    </Badge>
                )
            ) : (
                notificationIcon = <NotificationsIcon color="secondary"/>
            )
        } else {
            notificationIcon = <NotificationsIcon color="secondary" />
        }

        let notificationsMarkup = (notifications && notifications.length > 0) ? (
            notifications.map(nt => {
                const verbiage = nt.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(nt.createdAt).fromNow();
                const iconColor = nt.read ? 'primary' : 'secondary';
                const icon = nt.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style={{ marginRight:10 }}/>
                ) : (
                    <ChatIcon color={iconColor} style={{ marginRight:10 }} />
                )

                return (
                    <MenuItem 
                        component={Link}
                        to={`/users/${nt.recipient}/yap/${nt.yapId}`}
                        key={nt.createdAt} onClick={this.handleClose}
                    >
                        {icon}
                        <Typography
                            color="primary"
                            variant="body1"
                        >
                            {nt.sender} {verbiage} your yap {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                No notifications to be read!
            </MenuItem>
        )

        return (
            <Fragment>
                <Tooltip placement="top" title="notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleOpen}>
                        {notificationIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                onEntered={this.onMenuOpened}>
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}


Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);
