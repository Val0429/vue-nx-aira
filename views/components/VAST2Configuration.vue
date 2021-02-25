<template>
    <div key="main">
        <iv-auto-card :label="_('m_VAST2Configuration')">
            <iv-form
                ref="form"
                :interface="inf()"
                :value="value"
                @submit="doSubmit"
                />
        </iv-auto-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';
import { IFormNumberRange } from '@/../components/form/elements/form-number/form-number.vue';
import { GetConfigVAST2 } from '@/config/default/server';
import AlertResponse from '@/../components/modal/alert-response/alert-response.vue';

@Component
export default class VAST2Configuration extends Vue {
    /// Port Range
    private pr: IFormNumberRange = { min: 0, max: 65535 };

    private inf() {
        return `
        interface {
            /**
             * @uiLabel - ${this._("w_Account")}
             */
            username: string;

            /**
             * @uiLabel - ${this._("w_Password")}
             * @uiType - iv-form-password
             */
            password: string;
        };
        `;
    }

    value: GetConfigVAST2.Output = {} as any;
    private mounted(): void {
        this.$server.R("/config/vast2")
            .then(response => {
                this.value = response;
            });
    }

    private async doSubmit(): Promise<void> {
        await this.$server.C("/config/vast2", this.$form("form"));
        new AlertResponse({
            propsData: {
                label: this._("w_Settings"),
                value: this._("m_ConfigSuccessful")
            }
        }).$modal();
    }
}
</script>
