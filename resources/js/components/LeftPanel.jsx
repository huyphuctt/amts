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
    Icon
} from 'framework7-react';
import { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Navigation } from 'swiper';

class LeftPanel extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return <></>
    }
}
//             <Panel left reveal visibleBreakpoint={768}>
//                 <View>
//                     <Page>
//                         <a href="#" className="brand-link">
//                             <img src="/images/logo.png" alt="Logo" className="brand-image" style={{ opacity: '.8' }} />
//                             <span className="brand-text font-weight-bold">AMT</span>
//                         </a>
//                         <hr />
//                         {/* <List>
//                             <ListItem title="Dashboard">
//                                 <Icon material='home' className='panel-list-icon'></Icon>
//                             </ListItem>

//                             <ListItem href="/dashboard" className="nav-link active external margin-left">
//                                 <Icon material='menu'></Icon>
//                                 <p className=''>Dashboard</p>
//                             </ListItem>
//                             <Link iconMaterial="menu" href="/customer-db" className="nav-link external margin-left">
//                                 <p className='margin-left'>Customer DB</p>
//                             </Link>
//                             <Link iconMaterial="menu" href="/client-customers" className="nav-link external margin-left">
//                                 <p className='margin-left'>Client Customers</p>
//                             </Link>
//                             <Link iconMaterial="menu" href="/campaign" className="nav-link external margin-left">
//                                 <p className='margin-left'>Campaign</p>
//                             </Link>
//                             <Link iconMaterial="menu" href="/send-form" className="nav-link external margin-left">
//                                 <p className='margin-left'>Send Form</p>
//                             </Link>
//                             <Link iconMaterial="menu" href="/search-task" className="nav-link external margin-left">
//                                 <p className='margin-left'>Search Task</p>
//                             </Link>
//                             <Link iconMaterial="menu" href="/accounts" className="nav-link external margin-left">
//                                 <p className='margin-left'>Accounts</p>
//                             </Link>
//                             <Link iconMaterial="menu" href="/master-data" className="nav-link external margin-left">
//                                 <p className='margin-left'>Master Data</p>
//                             </Link>
//                             <Link iconMaterial="menu" href="/logs" className="nav-link external margin-left">
//                                 <p className='margin-left'>LogsLogsLogs</p>
//                             </Link>
//                             <Link iconMaterial="menu" href="/settings" className="nav-link external margin-left">
//                                 <p className='margin-left'>Settings</p>
//                             </Link>
//                         </List> */}
//                     </Page>
//                 </View>
//             </Panel >
//         </>
//     }
// }
export default LeftPanel;
