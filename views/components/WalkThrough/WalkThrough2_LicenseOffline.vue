<template>
    <div class="main1">
        <iv-language-button style="position: absolute; right: 0; top: 0" />

        <p class="v-title" v-html="_('m_Walkthrough7')" />
        <p class="v-subtitle2" v-html="_('m_Walkthrough8')" />
        
        <span class="v-subtitle2" v-html="_('m_Walkthrough9')" />
        <a class="link" @click="doOnline" v-html="_('m_Walkthrough10')" />

        <ul class="steps">
            <li>
                <span class="stepnum" v-html="_('m_StepNum', [1])" />
                <span v-html="_('m_Walkthrough11')" />
                <a class="link" :href="$server.Url('/license/mac/download')" v-html="_('m_Walkthrough12')" />
            </li>
            <li>
                <span class="stepnum" v-html="_('m_StepNum', [2])" />
                <span v-html="_('m_Walkthrough13')" />
                <a v-if="sfs.supporterEmail" class="link" :href="'mailto://'+sfs.supporterEmail" v-html="sfs.supporterEmail" />
            </li>
            <li>
                <span class="stepnum" v-html="_('m_StepNum', [3])" />
                <span v-html="_('m_Walkthrough14')" />
            </li>
        </ul>

        <iv-form
            class="form"
            ref="form"
            :interface="inf()"
            @submit="doSubmit"
        />

        <template v-if="$vref('form')">
            <iv-button class="register-button" size="lg"
                :label="_('w_Register')" icon="fa-bolt"
                v-bind="$refs.form.submitBindings.$attrs" v-on="$refs.form.submitBindings.$listeners"
                />
        </template>

        <div class="link2block">
            <span class="text" v-html="_('m_Walkthrough18')" />
            <a v-if="sfs.supporterEmail" class="link" :href="'mailto://'+sfs.supporterEmail" v-html="_('m_Walkthrough19')" />
        </div>

    </div>
</template>

<style lang="scss" scoped>
.main1 {
    .link, .link:visited, .link:hover, .link:active {
        text-decoration: underline !important;
        margin-left: 6px;
        font-size: 20px;
        font-weight: bold;
        color: #448489 !important;
        cursor: pointer;
    }

    .steps {
        margin-top: 40px;
        list-style-type: none;
        padding-left: 0;
        padding-top: 25px;

        li {
            font-size: 14px;
            color: #7E7E7E !important;
            margin-left: 22px;
            padding-left: 58px;
            margin-top: 25px;

            &:not(:last-child) {
                min-height: 60px;
                padding-bottom: 35px;
                border-left: 1px solid #707070;
            }

            > * {
                position: relative;
                top: -25px;
            }

            .stepnum {
                float: left;
                margin-left: -80px;
                font-size: 14px;
                font-weight: bold;
                color: #7E7E7E;
                width: 80px;
            }

            .link {
                font-size: 14px !important;
            }
        }
    }

    .form {
        margin-top: 40px;
        width: 600px;
    }

    .register-button {
        margin-top: 10px;
    }

    .link2block {
        margin-top: 20px;

        > .text {
            color: #656377;
            font-size: 14px;
        }

        > .link {
            font-size: 14px;
        }
    }
}
</style>

<script lang="ts">
import { GetConfigSFS } from '@/config/default/server';
import { Component, Vue, Emit } from 'vue-property-decorator';
import { ModalLoading } from '@/../components/modal/modal-loading';

@Component
export default class WalkThrough2_LicenseOffline extends Vue {
    private sfs: GetConfigSFS.Output = {};

    @Emit("online")
    private doOnline() {}

    @Emit("failed")
    private doFailed(msg: string) { return msg; }

    @Emit("success")
    private doSuccess() {}

    private mounted() {
        this.$server.R("/config/sfs")
            .then(response => {
                this.sfs = response;
            });
    }

    /// interface
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

    private toBase64(data: Blob): Promise<string> {
        let reader = new FileReader();
        return new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (e) => reject(e);
            reader.readAsText(data);
        });
    }

    private async doSubmit(data) {
        let modal = new ModalLoading();
        modal.$modal();

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            await this.$server.C("/license", {
                keyOrData: await data.file.toString()
            }, undefined, undefined, true);
            this.doSuccess();

        } catch(e) { this.doFailed(e.body) } finally {
            modal.close();
        }
    }
}
</script>
