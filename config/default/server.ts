import { iSAPServerBase, ApisRequestBase, InputR, OutputR, OutputU, InputU } from '@/../core/server';

interface RestfulRequest extends ApisRequestBase { 
    "Get": { 
        "/config/sfs": [GetConfigSFS.Input, GetConfigSFS.Output, false]
        "/config/vast2": [GetConfigVAST2.Input, GetConfigVAST2.Output, false]
        "/cameras": [GetCameras.Input, GetCameras.Output, false]
        "/license": [GetLicense.Input, OutputR<GetLicense.Output>, false]
        "/license/mac": [GetLicenseMac.Input, GetLicenseMac.Output, false]
    }, 
    "Post": { 
        "/config/sfs": [PostConfigSFS.Input, PostConfigSFS.Output, false]
        "/config/vast2": [PostConfigVAST2.Input, PostConfigVAST2.Output, false]
        "/license": [PostLicense.Input, PostLicense.Output, false]
        "/test/vast2": [PostTestVAST2.Input, PostTestVAST2.Output, false]
    },
    "Put": {
    },
    "Delete": {
    },
    "Ws": {
    }, 
}

export class Server extends iSAPServerBase<RestfulRequest> {}
export default Server;

/// /config/sfs - Get ///////////////////////////////////// 
export declare namespace GetConfigSFS { 
    export interface Input { 
    } 

    export interface Output { 
        mergeFaceSeconds?: number;
        /// 人臉合併分數
        mergeFaceScore?: number;
        keepFacesDays?: number;
    
        /// 搜尋分數 0-100
        searchSimilarityThreshold?: number;
        /// 搜尋時間範圍, 10-120
        searchPeriodMinutes?: number;
        /// 顯示資料數量, 60-300
        faceWallDisplayMaxNumber?: number;
        /// 影片回放擷取時間 5-60
        preAndPostVideoDurationSeconds?: number;
        /// 資料保留時間 0-180
        dataRetensionDays?: number;

        supporterEmail?: string;
    } 
} 
////////////////////////////////////////////////////////////// 

/// /config/sfs - Post ///////////////////////////////////// 
export declare namespace PostConfigSFS { 
    export type Input = GetConfigSFS.Output;
    export type Output = GetConfigSFS.Output;
} 
////////////////////////////////////////////////////////////// 

/// /config/vast2 - Get ///////////////////////////////////// 
export declare namespace GetConfigVAST2 { 
    export interface Input { 
    } 

    export interface Output { 
        hostname: string;
        port: number;
        protocol: string;
        username?: string;
        password?: string;
    } 
} 
////////////////////////////////////////////////////////////// 

/// /config/vast2 - Post ///////////////////////////////////// 
export declare namespace PostConfigVAST2 { 
    export type Input = Partial<GetConfigVAST2.Output>;
    export type Output = GetConfigVAST2.Output;
} 
////////////////////////////////////////////////////////////// 

/// /test/vast2 - Post ///////////////////////////////////////
export declare namespace PostTestVAST2 {
    export type Input = GetConfigVAST2.Output;
    export type Output = any;
}
////////////////////////////////////////////////////////////// 

/// /cameras - Get ///////////////////////////////////// 
export declare namespace GetCameras { 
    export interface ICameraConfig {
        /// default: true
        enable?: boolean;
        /// default: true. only decode iframe. false to decode all.
        ionly?: boolean;
        /// default: 0 (px). face w & h should be larger than N (pixels).
        minFaceLength?: number;
        /// default: 5 (seconds)
        mergeFaceSeconds?: number;
    }
    
    export interface Input {
    }
    export interface Output {
        engineObjectId?: string;
        /// mapping: IVast2Camera.Name
        uniqueIdentity: string;
        /// mapping: IVast2Camera.RefName
        refName: string;
        /// mapping: IVast2Camera.ip
        ip: string;
        /// mapping: IVast2Camera.port
        port: number;
        /// mapping: IVast2Camera.HTTPSPort
        httpsPort?: number;
        /// mapping: IVast2Camera.UseSSL
        useSSL?: boolean;
    
        config?: ICameraConfig;
    }
} 
////////////////////////////////////////////////////////////// 

/// /license - Get ///////////////////////////////////// 
export declare namespace GetLicense { 
    export interface Input {
    }
    export interface Output {
        count: number;
        expired: boolean;
        licenseKey: string;
        mac: string;
        productNO: string;
        trial: boolean;
    }
} 
////////////////////////////////////////////////////////////// 

/// /license - Post ///////////////////////////////////// 
export declare namespace PostLicense { 
    export interface Input {
        mac?: string;
        keyOrData: string;
    }
    export interface Output {
    }
} 
////////////////////////////////////////////////////////////// 

/// /license/mac - Get ///////////////////////////////////// 
export declare namespace GetLicenseMac { 
    export interface Input {
    }
    export interface OutputUnit {
        name: string;
        mac: string;
    }
    export type Output = OutputUnit[];
} 
////////////////////////////////////////////////////////////// 
