<template>
    <div class="main1">
        <iv-language-button style="position: absolute; right: 0; top: 0" />

        <p class="v-title" v-html="_('m_Walkthrough15')" />
        <p class="v-subtitle" v-html="_('m_Walkthrough16')" />
    </div>
</template>

<style lang="scss" scoped>
.main1 {
    .form {
        margin-left: -13px;
        margin-top: 55px;
        width: 400px;
        transform: scale(1.3);
        transform-origin: left;

        .license {
            margin-top: 30px;
            transform: scale(1.3);
            transform-origin: left;

            & /deep/ input {
                width: 300px !important;
            }
        }

        .link {
            text-decoration: underline;
            margin-left: 20px;
            cursor: pointer;
        }

        .selection {
            margin-top: 45px;
            transform: scale(1.3);
            transform-origin: left;

            & /deep/ > div {
                width: 300px !important;
            }
        }
    }

    .connect-button {
        margin-top: 40px;
        margin-left: 6px;
        transform: scale(1.1);
        transform-origin: left;
    }
}
</style>

<script lang="ts">
import { GetLicenseMac } from '@/config/default/server';
import { Component, Vue, Emit } from 'vue-property-decorator';
import { ModalLoading } from '@/../components/modal/modal-loading';

@Component
export default class WalkThrough12_VAST2Cameras extends Vue {
    /// united emitter
    // @Emit("failed")
    // private doFailed(msg: string) { return msg; }

    @Emit("success")
    private doSuccess() {}

    /// interface
    private inf() {
        return `
        interface {
            /**
             * @uiLabel - ${this._("wb_Username")}
             */
            username: string;
            /**
             * @uiLabel - ${this._("wb_Password")}
             * @uiType - iv-form-password
             */
            password: string;
        }
        `;
    }

    private async doSubmit(data) {
        let modal = new ModalLoading();
        modal.$modal();

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            await this.$server.C("/config/vast2", {
                username: data.username,
                password: data.password
            });
            this.doSuccess();

        } catch(e) {
            /*this.doFailed(e.body) */
        } finally {
            modal.close();
        }

        // try {
        //     console.log("send the license", {
        //         mac: data.mac,
        //         keyOrData: data.license
        //     });
        //     await this.$server.C("/license", {
        //         mac: data.mac,
        //         keyOrData: data.license.toUpperCase()
        //     }, undefined, undefined, true);

        //     console.log("no error");
        // } catch(e) { this.doFailed(e.body) } finally {
        //     modal.close();
        // }
    }
}
</script>
