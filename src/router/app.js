import React from "react";
import {HashRouter} from "react-router-dom";
import Main from "./Main";
import {Provider} from "react-redux";
import configureStore from "STORE/configStore";

const store = configureStore();
const App = () => (
	<Provider store={store}>
		<HashRouter>
			<Main />
		</HashRouter>
	</Provider>
);

export default App;