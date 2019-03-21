import * as Actions from "./actions";

// 公用基础reducer
const INITIAL_STATE = {
	classId: null,	// 班级id
	studentList: [],	// 学生列表
	studentCurPage: 1, // 学生列表当前页（1-默认）
	studentTotalPage: null, // 学生列表总页数
	studentTotalSize: null,	// 学生列表总人数
	checkedStudent: [],	// 左侧列表选中的学生数组
	groupCnt: null,	// 班级分组数量
	unallocCnt: null,	// 班级未分组人数
	groups: [],	// 班级各分组信息
	updateGroupId: null,  // 当前正在编辑的组id
};
const root = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Actions.classId:
			return {
				...state,
				classId: action.classId,
			};
		case Actions.studentList:
			return {
				...state,
				studentList: action.studentList,
				studentCurPage: action.studentCurPage,
				studentTotalPage: action.studentTotalPage,
				studentTotalSize: action.studentTotalSize,
			};
		case Actions.checkedStudent:
			return {
				...state,
				checkedStudent: action.checkedStudent,
			};
		case Actions.groupsInfo:
			return {
				...state,
				groupCnt: action.groupCnt,
				unallocCnt: action.unallocCnt,
			};
		case Actions.groups:
			return {
				...state,
				groups: action.groups,
			};
		case Actions.updateGroupId:
			return {
				...state,
				updateGroupId: action.updateGroupId,
			}
		default:
			return state;
	}
};

export default root;