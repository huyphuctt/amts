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
import Footer from '../components/Footer';
import LeftPanel from '../components/LeftPanel';

class PageSettings extends Component {
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
    }

    render() {
        return <>
            <LeftPanel />
            <View main>
                <Page>
                    <Header title='Settings'/>
                    <Block>
                        <p>
                            [HOME] Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae
                            facilis laudantium voluptates obcaecati officia cum, sit libero commodi...
                        </p>
                    </Block>
                </Page>
            </View>
        </>
    }
}

export default PageSettings
