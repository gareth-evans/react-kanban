import {Dispatcher} from "flux";

class AppDispatcher extends Dispatcher<any> {
    dispatchAsync(promise: any, types: any, payload?: any) {
        const {request, success, failure} = types;
        let dispatch = this.dispatch.bind(this);
        dispatch({type: request, payload: Object.assign({}, payload) });

        promise
            .then(
                response => dispatch({
                    type: success,
                    payload: Object.assign({}, payload, {response})
                }),
                error => dispatch({
                    type: failure,
                    payload: Object.assign({}, payload, {error})
                }
                )
            );
    }
}

export default new AppDispatcher();