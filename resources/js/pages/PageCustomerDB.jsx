import axios from 'axios'
import React, { Component } from 'react'

import {
    f7,
    f7ready,
    App,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    ListButton,
    BlockFooter,
    PageContent,
    Button,
    Popover
} from 'framework7-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeftPanel from '../components/LeftPanel';
import CONST from '../utils/Const';
import Pagination from '../components/Pagination';
import Utils from '../utils/Utils';
import AbsComponent from '../components/AbsComponent';

class PageCustomerDB extends AbsComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    // Bound to the refresh button
    refresh() {
        this.setState({ refreshing: true });
    }

    // Callback from the `Content` component
    onComponentRefresh() {
        this.setState({ refreshing: false });
    }

    componentDidMount() {
        const self = this;
        var options = {};
        options.action = CONST._ACTION_GET_ITEM_;
        options.item_type = CONST._ITEM_URL_;
        self.fetchPage(options);
    }
    async fetchPage(__pageParams) {
        //axios 
        const self = this;
        const body = Utils.formData(__pageParams);
        Utils.showLoading();
        let submitResponse = await axios.post(CONST._ROOT_ + CONST._API_, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            return response;
        }).catch(function (error) {
            Utils.log(error);
            return null;
        });
        Utils.hideLoading();
        if (submitResponse && submitResponse.data) {
            const data = submitResponse.data;
            if (data.err === CONST._ERR_EXPIRED_) {
                const appDetails = self.props.app;
                const redirectUrl = 'signin.html?returnUrl=' + Utils.buildUri(appDetails.query);
                Utils.showToast(data.msg, data.err, CONST.TOAST_BOTTOM_CENTER);
                Utils.setLocalStorage('token', '');
                Utils.executeOnce(() => {
                    window.location.href = redirectUrl;
                }, 500);
            } else if (data.err === CONST._ERR_SUCCESS_) {
                self.setState({ __pageData: data.data, __pageParams: __pageParams, __pageDataLoaded: true });

            } else {
                // Utils.showToast(data.msg, data.err, CONST.TOAST_BOTTOM_CENTER);
                //clear login status then reload
                Utils.setLocalStorage('token', '');
                Utils.executeOnce(() => {
                    window.location.reload(true);
                }, 1000);
            }
        }
    }

    render() {
        const self = this;
        var { __pageDataLoaded, __pageData } = self.state;
        return <>
            <LeftPanel />
            <View main>
                <Header title='Customer DB' />
                <Toolbar top className='border' >
                    <Link>Right Link</Link>
                    <Link iconMaterial="logout" className='text-danger' popoverOpen=".popover-menu" ></Link>

                </Toolbar>
                {__pageDataLoaded ? <Pagination items={__pageData.items} pagination={__pageData.pagination} /> : ''}
                <Popover className="popover-menu">
                    <List>
                        <ListItem link="#" popoverClose title="Dialog" />
                        <ListItem link="#" popoverClose title="Tabs" />
                        <ListItem link="#" popoverClose title="Side Panels" />
                        <ListItem link="#" popoverClose title="List View" />
                        <ListItem link="#" popoverClose title="Form Inputs" />
                    </List>
                </Popover>

            </View>
        </>
    }
}

export default PageCustomerDB
