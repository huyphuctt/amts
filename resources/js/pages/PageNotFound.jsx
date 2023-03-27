import React from 'react'

import Utils from '../utils/Utils';
import AbsComponent from '../components/AbsComponent';
import { Page } from 'framework7-react';

class PageNotFound extends AbsComponent {
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
        // Utils.hideLoading();
    }

    render() {
        const self = this;
        const __appDetails = self.props.app;
        return (
            <>
                <Page loginScreen>
                        404 page
                </Page>
            </>
        );
    }
}

export default PageNotFound
