import { Url } from '@/../core/utilities/url-join';
import * as request from "request";

interface INxServerConfig {
    ip: string;
    port: number;
}

export class NxServer {
    private config: INxServerConfig;
    constructor(config?: INxServerConfig) {
        this.config = config;

        (window as any).vmsApiInit = () => {
            (window as any).vms.log.info("Yes");
        }
    }

    // login(username: string, password: string): Promise<any> {
    login(username: string, password: string) {
            const url = this.makeUrl("login/sessions");
        let o = { username, password };

        // return new Promise((resolve, reject) => {
        //     request({
        //         url, method: "POST", json: true,
        //         headers: { "Accept": "application/json", "Access-Control-Allow-Origin": "*" },
        //         body: o,
        //         timeout: 2000
        //     }, (err, res, body) => {
        //         if (!err && res && res.statusCode == 200) {
        //             /// success
        //             resolve(body);
        //         } else {
        //             console.log("nx login failed.");
        //             reject([err, body]);
        //         }
        //     });
        // });
    }

    makeUrl(path?: string, uri?: string): string {
        return Url.join(`https://${this.config.ip}:${this.config.port}/rest/v1`, path, uri);
    }
}