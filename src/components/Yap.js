import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {
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
    render() {
        dayjs.extend(relativeTime);

        //const classes = this.props.classes;
        const { classes, yap: {body, commentCount, likeCount, userHandle, userImage, yapId, createdAt} } = this.props; //destructuring
        console.log(this.props)
        console.log(classes)
        return (
            <Card className={classes.card}> 
                <CardMedia 
                    className={classes.image}
                    image={userImage}
                    title="Profile image"
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1" >{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Yap)
