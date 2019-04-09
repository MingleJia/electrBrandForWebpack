import * as Actions from "./actions";

// 公用基础reducer
const INITIAL_STATE = {
	info: {} ,// 用户信息
	campusDetailId : '', //校园风采详情页默认id
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
			};
		default:
			return state;
	}
};

export default root;