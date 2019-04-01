import { render } from 'react-dom';
import React from 'react';
import 'STYLES/reset.css';
import App from 'ROUTER/app';

const mainContent = document.getElementById('main');
render( <App/>, mainContent);
if (module.hot) {
    module.hot.accept('ROUTER/app', () => {
            render( <App/>, mainContent)
        }
    );
}