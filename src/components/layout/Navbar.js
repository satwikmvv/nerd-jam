import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostYap from '../yap/PostYap';

//Redux
import { connect } from 'react-redux';

//Material ui (importing individually to not depend on the entire library and reduce bundle)
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//ICONS
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';



export class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostYap />
                            <Link to='/'>
                                <MyButton tip="Home">
                                    <HomeIcon color="secondary" />
                                </MyButton>
                            </Link>
                            <MyButton tip="Notifications">
                                <Notifications color="secondary" />
                            </MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/signup">SignUp</Button>
                        </Fragment>
                    )}


                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
