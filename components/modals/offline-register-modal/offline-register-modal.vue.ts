/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";
import { toEnumInterface } from '@/../core';
import RegisterSuccessModal from '@/components/modals/register-success-modal/register-success-modal.vue';

@Component
export default class OfflineRegisterModal extends Vue {
    @Prop({ type: Boolean, required: false })
    visible: boolean;

    @Emit('success')
    doSuccess() {}

    @Emit('update:visible')
    doUpdateVisible(value: boolean) { return value; }

    private mounted() {
        this.$server.R("/license/mac")
            .then(response => {
                this.options = response.reduce((final, value) => {
                    final[value.mac] = `${value.name} - ${value.mac}`;
                    return final;
                }, {});
            });
    }

    async doSubmit(data) {
        this.$server.C("/license", {
            keyOrData: await data.file.toString()
        }).then(() => {
            this.visible = false;
            new RegisterSuccessModal().$modal();
            this.doSuccess();
        });
    }

    private options = {};
    private value: { mac: string, license: string } = {} as any;
    private inf() {
        return `
        interface {
            /**
             * @uiType - iv-form-file
             * @uiLabel - ${this._("m_Walkthrough17")}
             * @uiAttrs - { accept: ".lic" }
             */
            file: string;
        }
        `;
    }
}
