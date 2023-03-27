import axios from 'axios'
import React from 'react'
import Utils from '../utils/Utils';
import Common from '../utils/Common';
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
    BlockFooter
} from 'framework7-react';

import AbsComponent from '../components/AbsComponent';
import CONST from '../utils/Const';

class PageSignIn extends AbsComponent {
    constructor(props) {
        super(props);
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
        // try {
        //     if (this.usernameInput) {
        //         this.usernameInput.focus();
        //     }
        // } catch (error) {
        // }
    }

    async signIn() {
        const self = this;
        const __appDetails = self.props.app;
        var { __pageData } = self.state;
        var check_list = {
            username: '',
            password: ''
        }

        var params = {};
        const ignore_fields = [
            'files',
        ];
        for (const key in __pageData) {
            if (Object.hasOwnProperty.call(__pageData, key)) {
                const value = __pageData[key];
                if (!ignore_fields.includes(key)) {
                    params[key] = value;
                }
            }
        }
        params.action = 'login';

        const body = Utils.formData();
        var contentType = 'application/json';
        if (Utils.isset(__pageData, 'files')) {
            contentType = 'multipart/form-data';
            for (const key in __pageData['files']) {
                if (Object.hasOwnProperty.call(__pageData['files'], key)) {
                    const element = __pageData['files'][key];
                    if (element != null) {
                        element.forEach((ele, index) => {
                            body.append(`${key}-${index}`, ele, ele.name);
                        });
                    }
                }
            }
        }
        body.append('params', JSON.stringify(params));
        Common.showLoading('');
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
        Common.hideLoading();
        if (submitResponse && submitResponse.data) {
            const data = submitResponse.data;
            if (data.err === CONST._ERR_SUCCESS_) {
                Utils.setLocalStorage('token', data.token);
                const templates = data.templates;
                if (__appDetails.query.params.has('returnUrl')) {
                    const returnUrl = __appDetails.query.params.get('returnUrl');
                    if (returnUrl.length > 0) {
                        window.location.href = returnUrl;
                    } else {
                        window.location.reload();
                    }
                } else {
                    window.location.reload();
                }
            } else {
                Common.showToast(data.msg);
            }
        }
    }
    render() {
        const self = this;
        var { __pageData } = self.state;
        return (
            <View main>
                <Page loginScreen>
                    <LoginScreenTitle>Login</LoginScreenTitle>
                    <List form>
                        <ListInput
                            type="text"
                            name="email"
                            placeholder="Email address"
                            ref={(input) => { this.usernameInput = input; }}
                            value={__pageData.username}
                            onChange={self.textChanged}
                        ></ListInput>
                        <ListInput
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={__pageData.password}
                            onChange={self.textChanged}
                        ></ListInput>
                    </List>
                    <List>
                        <ListButton title="Sign In" onClick={(e) => { e.preventDefault(); self.signIn() }} />
                    </List>
                </Page>
            </View>
        );
    }
}

export default PageSignIn
