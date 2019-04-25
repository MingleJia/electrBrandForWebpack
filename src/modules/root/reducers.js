import * as Actions from "./actions";

// 公用基础reducer
const INITIAL_STATE = {
	info: {} ,// 用户信息
	campusDetailId : '', //校园风采详情页默认id
	campusList: [], //校园风采
	displayImg: false, //是否显示预览图片
	previewImg: '', //当前预览图片的url 
	noticeId: '', //首页当点点击选中id
	noticeNum : 0, //选中第几条消息
};
const root = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Actions.userInfo:
			return {
				...state,
				info: action.info,
			};
		case Actions.campusStyle:
			return {
				...state,
				campusDetailId: action.campusDetailId,
				campusList: action.campusList,
			};
		case Actions.imgPrev:
			return {
				...state,
				displayImg: action.displayImg,
				previewImg: action.previewImg,
			};
		case Actions.checkNotice:
			return {
				...state,
				noticeId: action.noticeId,
				noticeNum: action.noticeNum,
			};
		default:
			return state;
	}
};

export default root;