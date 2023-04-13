import axios from 'axios';
import {
    Navbar,
    Link,
    NavLeft,
    NavTitle,
    NavRight
} from 'framework7-react';
import { Component } from 'react'
import CONST from '../utils/Const';
import Utils from '../utils/Utils';
import $ from "jquery";
class Header extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    async signOut() {
        window.location.href = '/signout.html';
        var body = {
            action: 'logout',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').content
        };
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
        // if (submitResponse && submitResponse.data) {
            window.location.reload(true);
        // }
    }
    render() {
        const self = this;
        const { title } = this.props;
        return <Navbar>
            {/* <NavLeft>
                <Link iconMaterial='menu' panelOpen="left"></Link>
            </NavLeft> */}
            <NavTitle>{title}</NavTitle>
            <NavRight>
                <Link iconMaterial="logout" className='text-danger' onClick={(e) => { e.preventDefault(); self.signOut() }} ></Link>
            </NavRight>
        </Navbar >
    }
}
export default Header;
