/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

@Component
export class SystemSetting extends Vue {
    @Model('input', { type: String })
    value: string;

    private inf_setting() {
        return `
        interface {
            /**
             * @uiLabel - IP Address
             * @uiColumnGroup - 1
             */
            ip: string;
            /**
             * @uiLabel - Port
             * @uiColumnGroup - 1
             */
            port: number;
            /**
             * @uiLabel - Username
             * @uiColumnGroup - 2
             */
            username: string;
            /**
             * @uiLabel - Password
             * @uiColumnGroup - 2
             */
            password: string;
        };
        `;
    }
}
export default SystemSetting;