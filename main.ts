import { DisableLoginRouter, obDefaultRoute } from "@/../core/router";

import "echarts";
import { Global } from './helpers/global';

DisableLoginRouter();

// /// load /license when web initial
// import Server from "./config/default/server";
// (async () => {
//     let server = Server.getDefault();
//     let license = await server.R("/license");
//     if (license.paging.total === 0) {
//         let router = await obDefaultRoute.pipe(filter(v => v)).pipe(first()).toPromise();
//         router.push("/walk-through");
//     }
// })();


// (async () => {
//     try {
//         let rtn = await Global.nx_server.login("admin", "Az123567!");
//         console.log("result", rtn);
//     } catch(e) {
//         console.log("error", e);
//     }
// })();

