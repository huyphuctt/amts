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
    Button
} from 'framework7-react';
import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import Utils from '../utils/Utils';
import Pagination from '../components/Pagination';
import CONST from '../utils/Const';

class PageDashboard extends Component {
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
        var options = {};
        options.action = CONST._ACTION_GET_FORM_LIST_;
        options.group = group;
        options.type = CONST._ITEM_FORM_;
        var hash = '';
        if (window.location.hash) {
            hash = window.location.hash.replace('#', '');
            options.extras = hash;
        }
        var template = self.getTemplate(0, hash);
        if (template.id > 0) {
            var column = 'type';
            options.filters = {};
            options.filters[column] = {
                column: 'type', operator: '=', value: template.id, 'boolean': 'AND'
            };
        }
        self.updateTitle(template.display);
        self.fetchPage(options);
    }
    async fetchPage(__pageParams) {
        //axios 
        const self = this;
        const body = Utils.formData(__pageParams);
        Utils.showLoading();
        let submitResponse = await axios.post(CONST._API_, body, {
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
                const redirectUrl = '/signin.html?returnUrl=/' + Utils.buildUri(appDetails.query);
                Utils.showToast(data.msg, data.err, CONST.TOAST_BOTTOM_CENTER);
                Utils.setLocalStorage('token', '');
                Utils.executeOnce(() => {
                    window.location.href = redirectUrl;
                }, 500);
            } else if (data.err === CONST._ERR_SUCCESS_) {
                if (submitResponse.data.settings) {
                    Utils.setLocalStorage('settings', JSON.stringify(submitResponse.data.settings));
                }
                self.setState({ __pageData: data.data, __pageParams: __pageParams });

            } else {
                Utils.showToast(data.msg, data.err, CONST.TOAST_BOTTOM_CENTER);
                //clear login status then reload
                Utils.setLocalStorage('token', '');
                Utils.executeOnce(() => {
                    window.location.reload(true);
                }, 1000);
            }
        }
    }

    render() {
        return <>
            <LeftPanel />
            <View main>
                <Header title='Dashboard' />
                <Pagination />
                {/* <Pagination items={forms} paging={formPaging} callback={self.pageDataCallback} /> */}
            </View>
        </>
    }
}

export default PageDashboard
