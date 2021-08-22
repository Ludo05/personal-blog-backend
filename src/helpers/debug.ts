import debug, { Debugger } from 'debug';

const myDebug = (namespace: string) => debug(namespace);

export {
    myDebug,
    Debugger
};
