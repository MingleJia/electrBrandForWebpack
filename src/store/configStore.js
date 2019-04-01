import { createStore, compose, applyMiddleware } from 'redux'; // 引入redux createStore、中间件及compose
import reducer from 'MODULES/index'; // 引入reducers集合
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configStore(initialState) {
    // 创建一个中间件集合
    const middleware = [];
    //创建store
    const store = createStore(
        reducer, {
            root: initialState
        },
        composeEnhancers(
            applyMiddleware(...middleware)
        )
    );
    
    if (module.hot) {
        module.hot.accept('MODULES/index.js', () =>
            store.replaceReducer(require('MODULES/index.js').default)
        );
    }

    return store;
}