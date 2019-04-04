import * as Actions from "./actions";

// 公用基础reducer
const INITIAL_STATE = {
	info: {} // 用户信息
};
const root = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Actions.userInfo:
			return {
				...state,
				info: action.info,
			};
		default:
			return state;
	}
};

export default root;