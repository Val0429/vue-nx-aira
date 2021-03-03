<template>
    <div class="main1">
        <iv-language-button style="position: absolute; right: 0; top: 0" />

        <p class="v-title" v-html="_('m_Walkthrough15')" />
        <p class="v-subtitle" v-html="_('m_Walkthrough16')" />

        <iv-form
            class="form"
            ref="form"
            :interface="inf()"
            @submit="doSubmit"
        >
        </iv-form>

        <template v-if="$vref('form')">
            <iv-button class="connect-button" size="lg" icon="fa-plug" v-bind="$refs.form.submitBindings.$attrs" v-on="$refs.form.submitBindings.$listeners">{{ _("w_Connect") }}</iv-button>
        </template>

        <p class="failed-message" v-if="failedMessage.length > 0" v-html="_(failedMessage)" />
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

    .failed-message {
        margin-top: 20px;
        margin-left: 3px;
        font-size: 16px;
        color: #F86D70;
    }
}
</style>

<script lang="ts">
import { GetConfigVAST2, GetLicenseMac, PostTestVAST2 } from '@/config/default/server';
import { Component, Vue, Emit } from 'vue-property-decorator';
import { ModalLoading } from '@/../components/modal/modal-loading';

@Component
export default class WalkThrough11_VAST2 extends Vue {
    private vast2: GetConfigVAST2.Output = {} as any;
    private failedMessage: string = "";

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

    private mounted() {
        this.$server.R("/config/vast2")
            .then(response => {
                this.vast2 = response;
            });
    }

    private async doSubmit(data) {
        let modal = new ModalLoading();
        modal.$modal();

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            /// test vast2
            await this.$server.C("/test/vast2", {
                ...this.vast2,
                ...data,
            }, undefined, undefined, true);

            /// save back to server
            await this.$server.C("/config/vast2", {
                username: data.username,
                password: data.password
            });
            this.doSuccess();

        } catch(e) {
            var body = e.body || "";
            if (/^statusCode/.test(body))
                this.failedMessage = "m_Walkthrough20";
            else
                this.failedMessage = "m_Walkthrough21";

        } finally {
            modal.close();
        }
    }
}
</script>
