
// Import React and ReactDOM
import React from 'react';

import { createRoot } from 'react-dom/client';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import App Component
import AppRoute from './components/AppRoute.jsx';

// Init F7 React Plugin
Framework7.use(Framework7React)
// ReactDOM.render(<AppRoute />, document.getElementById('app'))


// Mount React App
const root = createRoot(document.getElementById('app'));
root.render(<AppRoute />);
