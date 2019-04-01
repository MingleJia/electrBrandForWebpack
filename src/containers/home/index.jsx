import React,{Component, Fragment} from 'react';
import Tab from 'COMPONENTS/tab';

class Home extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const home = (
            <Fragment>
                首页
                <Tab />
            </Fragment>
        )
        return home;
    }
}

export default Home;