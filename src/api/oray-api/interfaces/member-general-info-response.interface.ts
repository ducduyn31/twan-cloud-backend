export interface HardwareMemberGeneralInfoResponse {
    SPMS: number;
    choiceSPMS: boolean;
    clientid: number;
    devicetype: number;
    groupid: number;
    ip: string;
    isbypasser: boolean;
    isdiyip: boolean;
    isnetworked: boolean;
    mask: string;
    memberid: number;
    memo: string;
    model: string;
    modeltype: number;
    networkid: number;
    networkname: string;
    originmodel: string;
    publicip: string;
    sn: string;
    state: number;
    version: string;
    versiontype: string;
}

export interface SoftwareMemberGeneralInfoResponse {
    clientid: string;
    devicetype: number;
    groupid: string;
    isdiyip: boolean;
    isnetworked: boolean;
    isowner: boolean;
    isshare: boolean;
    iswebvpn: boolean;
    mac: string;
    memberid: string;
    memo: string;
    mobile: string;
    networkid: string;
    networkname: string;
    owneraccount: string;
    platform: string;
    publicip: string;
    state: number;
    version: string;
    virtualip: string;
    vpnid: string;
}
