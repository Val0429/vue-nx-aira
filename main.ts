import { DisableLoginRouter, obDefaultRoute } from "@/../core/router";
import { filter } from "rxjs/internal/operators/filter";
import { first } from "rxjs/internal/operators/first";

DisableLoginRouter();

/// load /license when web initial
import Server from "./config/default/server";
(async () => {
    let server = Server.getDefault();
    let license = await server.R("/license");
    if (license.paging.total === 0) {
        let router = await obDefaultRoute.pipe(filter(v => v)).pipe(first()).toPromise();
        router.push("/walk-through");
    }
})();
