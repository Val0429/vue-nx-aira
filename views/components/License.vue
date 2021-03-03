<template>
    <iv-card :label="_('w_License')">
        <iv-table
            :server="{ path: '/license' }"
            :selectable="false"
            :interface="inf()"
            />
    </iv-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class License extends Vue {
    private inf() {
        return `
            interface {
                /**
                 * @uiType - iv-cell-auto-index
                 * @uiLabel - ${this._("w_No_")}
                 */
                autoIndex: any;
                /**
                 * @uiLabel - ${this._("m_LicenseKey")}
                 */
                licenseKey: string;
                /**
                 * @uiLabel - ${this._("m_MACAddress")}
                 */
                mac: string;
                /**
                 * @uiLabel - ${this._("w_Trial")}
                 */
                trial: boolean;
                /**
                 * @uiLabel - ${this._("w_Count")}
                 */
                count: number;
                /**
                 * @uiLabel - ${this._("m_RegisterDate")}
                 */
                registerDate: Date;
                /**
                 * @uiLabel - ${this._("m_ExpireDate")}
                 * @uiNull - ${this._("m_NoExpire")}
                 */
                expireDate: Date;
                /**
                 * @uiLabel - ${this._("w_Expired")}
                 */
                expired: boolean;
            }
        `;
    }
}
</script>
