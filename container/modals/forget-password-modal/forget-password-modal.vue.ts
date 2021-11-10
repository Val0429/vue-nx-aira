/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";
import AlertResponse from '@/../components/modal/alert-response/alert-response.vue';
import ModalLoading from '@/../components/modal/modal-loading/modal-loading.vue';

@Component
export default class ForgetPasswordModal extends Vue {
    @Prop({ type: Boolean, required: false })
    visible: boolean;

    @Emit('update:visible')
    doUpdateVisible(value: boolean) { return value; }

    private inf_1() {
        return `
        interface {
            /**
             * @uiLabel - ${this._("wb_Username")}
             */
            username: string;
            /**
             * @uiLabel - ${this._("wb_Email")}
             * @uiType - iv-form-email
             */
            email: string;
        }
        `;
    }
    private async validateStep(step: number, value: any) {
        let loading;
        if (step === 1 || step === 2 || step === 3) { try {
            loading = new ModalLoading();
            loading.$modal();
            if (step === 1) {
                await this.$server.C("/users/forget-password/step1", value);
            } else if (step === 2) {
                await this.$server.C("/users/forget-password/step2", value);
            } else if (step === 3) {
                await this.$server.C("/users/forget-password/step3", { verifyCode: this.$form("form_step_2", "verifyCode"), ...value });
                let res = new AlertResponse({
                    propsData: {
                        label: this._('m_ForgetPassword'),
                        value: this._('m_ForgetPasswordSuccess'),
                    },
                });
                res.$modal();
                this.visible = false;
            }
        } finally {
            loading.close();
        }}
        return true;
    }

    private inf_2() {
        return `
        interface {
            /**
             * @uiLabel - ${this._("m_ForgetPasswordStep2Line1")}
             * @uiType - iv-form-password
             */
            verifyCode: string;
        }
        `;
    }

    private inf_3() {
        return `
        interface {
            /**
             * @uiLabel - ${this._("m_ForgetPasswordStep3")}
             * @uiType - iv-form-password
             */
            password: string;
            /**
             * @uiLabel - ${this._("mb_ConfirmPassword")}
             * @uiType - iv-form-password
             * @uiValidation - (v, all) => all.password === v
             * @uiInvalidMessage - ${this._("m_PasswordNotMatch")}
             */
            confirmPassword: string;
        }
        `;
    }
}