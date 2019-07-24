import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//REDUX
import { connect } from 'react-redux';
import { deleteYap } from '../redux/actions/dataActions'

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top:'10%'
    }
}

class DeleteYap extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteYap = () => {
        this.props.deleteYap(this.props.yapId)
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip="Delete Yap"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>
                        Are you sure you want to delete the yap?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteYap} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteYap.propTypes = {
    deleteYap: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    yapId: PropTypes.string.isRequired
}

export default connect(null, { deleteYap })(withStyles(styles)(DeleteYap))
