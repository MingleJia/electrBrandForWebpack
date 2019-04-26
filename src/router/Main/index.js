import React, {Component, Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import {routerConfig} from '../config';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount () {
		let UA = navigator.userAgent;
        let isAndroid = /android|adr/gi.test(UA), isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid;
        if (isIos) {
            require('https://diag.leke.cn/scripts/common/mobile/cordova/cordova-ios.js');
        } else {
            require('https://diag.leke.cn/scripts/common/mobile/cordova/cordova-android.js');
        }
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
