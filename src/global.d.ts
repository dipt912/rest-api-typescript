import express from 'express';

interface Request<Body extends {} = any, Params extends {} = any, Query extends {} = any> extends express.Request {
    body: Body;
    params: Params;
    query: Query;
}

// interface Response< ResponseValue extends {} = any> extends express.Response {
//     // json (obj: ResponseValue): express.Response;
//     // json (obj: { error: string; code?: string; }): express.Response;
// }

interface Response<ResponseValue extends {}= any > extends express.Response {
//     json(obj: ResponseValue): express.Response;
//     json(obj: {
//         error: string;
//         code?: string;
//     }): express.Response;
}


export interface Dictionary<T> {
    [key: string]: T
}


