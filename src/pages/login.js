import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

//MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//REDUX
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = {
    
  form: {
    textAlign: 'center'
  },
  avatar: {
      margin:'auto',
      width:100,
      height:100,
      borderRadius: 0
  },
  pageTitle: {
      margin: '10px auto'
  },
  textField: {
      margin: '10px auto'
  },
  button: {
      marginTop:20,
      position: 'relative'
  },
  customError: {
      color:'red',
      fontSize: '0.8rem',
      marginTop: 10
  },
  progress:{
      position:'absolute'
  }
}


class login extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            password:'',
            errors: {}
        }

        // console.log(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
      
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Avatar alt="Vader" src={AppIcon} className={classes.avatar} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" error={errors.email ? true : false} helperText={errors.email} className={classes.textField} 
                        value={this.state.email} onChange={this.handleChange} fullWidth />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} error={errors.password ? true : false} helperText={errors.password}
                        value={this.state.password} onChange={this.handleChange} fullWidth />
                        
                        {errors.error && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.error}
                            </Typography>
                        )}
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <br />
                        <small>Not part of the family yet? Sign up <Link to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />

            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser:PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI:state.ui
})
const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));

