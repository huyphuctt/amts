import { Link, Toolbar } from 'framework7-react';
import { Component } from 'react'

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return <Toolbar position='bottom'>
            <Link>Left Link</Link>
            <Link>Right Link</Link>
        </Toolbar>
    }
}
export default Footer;
