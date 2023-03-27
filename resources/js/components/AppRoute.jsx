import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    App,
} from 'framework7-react';

import PageSignIn from '../pages/PageSignin';
import PageNotFound from '../pages/PageNotFound';

import PageCustomerDB from '../pages/PageCustomerDB';
import PageDashboard from '../pages/PageDashboard';
import PageLogs from '../pages/PageLogs';
import PageMasterData from '../pages/PageMasterData';
import PageSettings from '../pages/PageSettings';

import Utils from '../utils/Utils';
import Common from '../utils/Common';

class AppRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            f7params: {
                name: 'My App', // App name
                theme: 'auto', // Automatic theme detection
                routes: false,
            },
            appDetails: Common.getAppDetail(window.location, 'admin')
        }
    }

    componentDidMount() {
    }

    f7ready() {
        // Call F7 APIs here
    }
    render() {
        const self = this;
        var { f7params, appDetails } = self.state;
        const redirectUrl = '/signin.html?returnUrl=/' + Utils.buildUri(appDetails.query);
        return <App {...f7params} >
            <BrowserRouter>
                <Switch>
                    <Route path='/signin.html'>
                        {appDetails.authenticated === true ? <Redirect to='/' /> : <PageSignIn app={appDetails} />}
                    </Route>
                    <Route path='/dashboard'>
                        {appDetails.authenticated === false ? <Redirect to={redirectUrl} /> : <PageDashboard app={appDetails} />}
                    </Route>
                    <Route path='/customer-db'>
                        {appDetails.authenticated === false ? <Redirect to={redirectUrl} /> : <PageCustomerDB app={appDetails} />}
                    </Route>
                    <Route path='/master-data'>
                        {appDetails.authenticated === false ? <Redirect to={redirectUrl} /> : <PageMasterData app={appDetails} />}
                    </Route>
                    <Route path='/logs'>
                        {appDetails.authenticated === false ? <Redirect to={redirectUrl} /> : <PageLogs app={appDetails} />}
                    </Route>
                    <Route path='/settings'>
                        {appDetails.authenticated === false ? <Redirect to={redirectUrl} /> : <PageSettings app={appDetails} />}
                    </Route>
                    <Route path='/'>
                        {appDetails.authenticated === false ? <Redirect to={redirectUrl} /> : (appDetails.pages.includes(appDetails.query.page) ? <PageCustomerDB app={appDetails} /> : <PageNotFound app={appDetails} />)}
                        {/* 404 page */}
                    </Route>
                </Switch>
                <ToastContainer
                    closeOnClick={false}
                    transition={Flip}
                // theme="colored"
                />
            </BrowserRouter>
        </App>
    }
}
export default AppRoute;