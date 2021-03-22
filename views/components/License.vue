<template>
    <iv-card :label="_('w_License')">
        <template #toolbox>
            <iv-toolbox-more size="md">
                <iv-toolbox-custom
                    :label="_('m_RegisterOnline')"
                    icon="fa-plus"
                    @click="doRegisterOnline"
                    />
                <iv-toolbox-custom
                    :label="_('m_RegisterOffline')"
                    icon="fa-plus"
                    @click="doRegisterOffline"
                    />
                <iv-toolbox-custom
                    :label="_('m_RegisterClean')"
                    icon="fa-trash"
                    @click="doRegisterClean"
                    />
            </iv-toolbox-more>
            
            <iv-toolbox-divider />
        </template>

        <iv-table
            ref="table"
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
import AlertResponse from '@/../components/modal/alert-response/alert-response.vue';
import ConfirmResponse from '@/../components/modal/confirm-response/confirm-response.vue';
import OnlineRegisterModal from '@/components/modals/online-register-modal/online-register-modal.vue';
import OfflineRegisterModal from '@/components/modals/offline-register-modal/offline-register-modal.vue';

@Component
export default class License extends Vue {
    private doRegisterOnline() {
        let register = new OnlineRegisterModal();
        register.$on("success", () => {
            (this.$refs.table as any).reload();
        });
        register.$modal();
    }

    private doRegisterOffline() {
        let register = new OfflineRegisterModal();
        register.$on("success", () => {
            (this.$refs.table as any).reload();
        });
        register.$modal();
    }

    private doRegisterClean() {
        let confirm = new ConfirmResponse({
            propsData: {
                label: this._("m_RegisterCleanTitle"),
                value: this._("m_RegisterCleanBody")
            }
        });
        confirm.$on("submit", () => {
            this.$server.D("/license", {})
                .then(() => (confirm as any).visible = false);
            this.$router.push("/walk-through");
        });
        confirm.$on("cancel", () => (confirm as any).visible = false);
        confirm.$modal();
    }

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
                 * @uiDefault - ${this._("m_NoExpire")}
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
