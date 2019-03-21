import { classGrouping } from 'ROUTER/index';
const routerConfig=[
    {
        path:'/:classId',
        component: classGrouping,
        exact: true
    }
]

export {routerConfig};
