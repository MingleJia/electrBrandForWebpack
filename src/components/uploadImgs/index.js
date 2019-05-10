import React from 'react';
import {deleteImg, cameraIcon} from 'ASSETS/phone'
import styles from './index.scss'
import { isOnLine } from '../../utils/method';
/**
 * @param {是否重新渲染} isChange number 不渲染 1渲染
 * @param {默认数据} defaultData array
 * @param {数据改变回调函数} onChange function 
 */
export default class UploadImgs extends React.Component{

    constructor () {
        super();
        this.state = {
            maxImgNum: 5,
            uploadImgs: [],  //  拿到的图片的信息
            isChange: 1
        }
    }

    //  删除照片
    delImg = (index) => {
        let {uploadImgs} = this.state;
        uploadImgs.splice(index, 1);
        this.setState({uploadImgs})
        //传递uploadImgs
        this.props.onChange && this.props.onChange(uploadImgs);
    }

    //  上传照片
    addImg = () => {
        let {uploadImgs} = this.state;
        // this.setState({
        //     uploadImgs:[
        //         ...uploadImgs,
        //         'http://pic1.win4000.com/wallpaper/9/5450ae2fdef8a.jpg'
        //     ]
        // },()=>{this.props.onChange && this.props.onChange(this.state.uploadImgs);})
        isOnLine();
        window.takePicture = (info)=>{
            if (info.path) {
                uploadImgs.push(info.path); 
            } else {
                window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': '图片上传失败'}]);
            }
            this.setState({uploadImgs});
            //传递uploadImgs
            this.props.onChange && this.props.onChange(uploadImgs);
        }; 
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'takePicture', []);
    }
    // 查看大图
    showImg = (path) => {
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'openPicture', [{'path': path}]);
    }
    static getDerivedStateFromProps(props,state) {
    //当父级传入的props发生变化的时候就执行这里 return 新的state,相当于setState
        if(props.isChange == 1 && state.isChange == 1){
            return {
                uploadImgs: (props.defaultData||[]).map(item=>item.image),
                isChange : 0
            }
        }
        return null
    }
    render() {
        let {uploadImgs, maxImgNum} = this.state;
        return (
            <div className={styles.wrap}>
                <div className={styles.uploadImgs}>
                {
                    uploadImgs.map((item, index) => {
                        return (
                            <div className={`${styles.imgItem} ${styles.showImg}`} key={item}>
                                <img className={styles.showImgItem} src={item} onClick={() => {this.showImg(item)}}/>
                                <img className={styles.deleteImg} src={deleteImg} onClick={() => {this.delImg(index)}} />
                            </div>
                        )
                    })
                }
                {
                    uploadImgs.length < maxImgNum ? 
                    <div className={`${styles.imgItem} ${styles.uploadImg}`} onClick={this.addImg}>
                        <img src={cameraIcon}/>
                        <p>上传图片</p>
                    </div> : ''
                }
                
                </div>
                <div className={styles.div}></div>
                <p className={styles.tips}>图片可不上传，若上传最多5张，建议上传横图</p>
            </div>
        );
    }
}
UploadImgs.defaultProps = {};
UploadImgs.propTypes = function(){};
UploadImgs.propTypes = {};