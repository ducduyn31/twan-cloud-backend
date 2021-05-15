export interface NetworkResponse {
    networkid: number;
    name: string;
    serialnumber: number;
    type: number;
    userid: number;
    createtime: Date;
    updatetime: Date;
    version: string;
    isdelete: boolean;
    isdefault: boolean;
    authrule: {
        mold: string
    };
    line: string;
    linename: string;
    routernum: number;
    clientnum: number;
    servernum: number;
    bypassnum: number;
    speed: number;
    intelligentlink: boolean;
}
