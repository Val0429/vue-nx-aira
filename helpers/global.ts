import { NxServer } from './services/nx-server';

export const Global = {
    nx_server: new NxServer({ ip: "localhost", port: 7001 })
}