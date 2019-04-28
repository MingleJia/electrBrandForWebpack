import React from 'react';
import {deleteImg, cameraIcon} from 'ASSETS/phone'
import styles from './index.scss'
export default class UploadImgs extends React.Component{

    constructor () {
        super();
        this.state = {
            maxImgNum: 5,
            uploadImgs: []  //  拿到的图片的信息
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

    render() {
        let {uploadImgs, maxImgNum} = this.state;
        return (
            <div className={styles.wrap}>
                <div className={styles.uploadImgs}>
                {
                    uploadImgs.map((item, index) => {
                        return (
                            <span className={`${styles.imgItem} ${styles.showImg}`} key={item}>
                                <img className={styles.showImgItem} src={item} onClick={() => {this.showImg(item)}}/>
                                <img className={styles.deleteImg} src={deleteImg} onClick={() => {this.delImg(index)}} />
                            </span>
                        )
                    })
                }
                {
                    uploadImgs.length < maxImgNum ? 
                    <span className={`${styles.imgItem} ${styles.uploadImg}`} onClick={this.addImg}>
                        <img src={cameraIcon}/>
                        <p>上传</p>
                    </span> : ''
                }
                
                </div>
                <p className={styles.tips}>可不上传，若要上传最多5张，单张图片不得大于5MB，建议上传横图。</p>
            </div>
        );
    }
}
UploadImgs.defaultProps = {};
UploadImgs.propTypes = function(){};
UploadImgs.propTypes = {};