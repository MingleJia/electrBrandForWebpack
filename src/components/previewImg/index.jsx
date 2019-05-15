import React,{Component,Fragment} from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPreviewImg } from 'MODULES/root/actions';

class PreviewImg extends Component{
	constructor(props){
		super(props);
    }

    static propTypes = {
        setPreviewImg: PropTypes.func,
        root: PropTypes.object,
    }

    //隐藏
	hiddenPre = () =>{
        this.props.setPreviewImg({
            displayImg:false,
            previewImg: '',
        }) 
    }

	render(){
        const { displayImg, previewImg } = this.props.root;
		const previewContent = (
            <Fragment>
                <div className={styles['dialog-bg']}></div>
                <div className={styles['wrap']} onClick={ ()=>this.hiddenPre() }>
                    <img src={previewImg} />
                </div>
            </Fragment>
        )

		return displayImg ? previewContent : ''
	}
}

export default connect(
    ({ root }) => ({
        root: root,
    }), { setPreviewImg }
)(PreviewImg)