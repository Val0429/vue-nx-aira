/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Config } from '@/../config/default/serverConfig';

var config: Config = {
    // ip: "localhost",
    ip: "192.168.100.105",
    port: 80,
    ssl: false,
    cgiPath: "api",

    serverFrameworkVersionGreaterThan: "1.06.00"
}
export default config;
