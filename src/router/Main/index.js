import React, {Component,Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import {routerConfig} from '../config';
import Toolbar from 'COMPONENTS/toolbar';
import Foot from 'COMPONENTS/foot';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<div className="g-bd">
					<div className="g-mn">
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
					</div>
				</div>
				<Toolbar />
				<Foot />
			</Fragment>
		);
	}
}

export default withRouter(Main);
