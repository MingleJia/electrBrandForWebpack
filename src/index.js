import { render } from 'react-dom';
import React from 'react';
import 'STYLES/reset.css';
import App from 'CONTAINERS/index';

const mainContent = document.getElementById('main');
render( <App/>, mainContent);
if (module.hot) {
    module.hot.accept('CONTAINERS/index', () => {
            render( <App/>, mainContent)
        }
    );
}