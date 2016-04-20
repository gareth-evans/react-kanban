export const throttle = (func, wait?: number) => {
    let context, args: IArguments, prevArgs: IArguments, argsChanged, result;
    let previous = 0;

    return function() {
        let now: number, remaining: number;
        if (wait) {
            now = Date.now();
            remaining = wait - now - previous;
        }

        context = this;
        args = arguments;
        argsChanged = JSON.stringify(args) !== JSON.stringify(prevArgs);
        prevArgs = args;

        if (argsChanged || wait && (remaining <= 0 || remaining > wait)) {
            if (wait) {
                previous = now;
            }

            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
};