import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';

//MUI
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    ...theme.customStyles
    
})

const YapSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.cardSkeleton} key={index}>
            <CardMedia className={classes.coverSkeleton} image={NoImg} />
            <CardContent className={classes.cardContentSkeleton}>
                <div className={classes.handleSkeleton}/>
                <div className={classes.dateSkeleton}/>
                <div className={classes.fullLineSkeleton}/>
                <div className={classes.fullLineSkeleton}/>
                <div className={classes.halfLineSkeleton}/>
            </CardContent>
        </Card>
    ))

    return <Fragment>{content}</Fragment>
}

YapSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(YapSkeleton);