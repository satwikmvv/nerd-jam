import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'

//ICONS
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
//REDUX
import { connect } from 'react-redux';
import { postYap, clearErrors } from '../redux/actions/dataActions';

const styles = (theme) => ({
    submitButton:{
        marginTop: 20,
        position: 'relative',
        float: 'right'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '3%'
    }
})

class PostYap extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }

        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
        }
    }


    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postYap({ body: this.state.body });
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Yap!">
                    <AddIcon color='secondary'/>
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post a new Yap</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="YAPPPP!"
                                multiline
                                rows="3"
                                placeholde="Sir Yaps a lot"
                                error={errors.body ? true : false }
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>

                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostYap.propTypes = {
    postYap: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.ui
})

export default connect(mapStateToProps, { postYap, clearErrors })(withStyles(styles)(PostYap))