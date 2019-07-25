import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//ICONS
import CloseIcon from '@material-ui/icons/Close'

//Redux
import { connect } from 'react-redux';
import { postYap, clearErrors } from '../redux/actions/dataActions';


export class YapDialog extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default YapDialog
