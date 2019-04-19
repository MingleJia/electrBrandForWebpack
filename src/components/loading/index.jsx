import React,{Component} from 'react';
import styles from './index.scss';
import { loadingImg } from 'ASSETS/loading';

class Loading extends Component{
	constructor(props){
		super(props);
	}
	

	render(){


		const loading = (
            <div className={styles['loading']}>
                <img src={ loadingImg } />
            </div>
        )

		return loading
	}
}

export default Loading