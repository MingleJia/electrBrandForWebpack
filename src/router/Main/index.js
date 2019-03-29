import React, {Component, Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import {routerConfig} from '../config';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<Switch>
					{
						routerConfig.map((item,index)=>{
							const {path,component,exact}=item;
							return (
								<Route
									key={index}
									path={path}
									component={component}
									exact={exact}
								/>
							)
						})
					}
				</Switch>
			</Fragment>
		);
	}
}

export default withRouter(Main);
