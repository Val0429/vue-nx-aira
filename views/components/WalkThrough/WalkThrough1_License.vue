<template>
    <div class="main1">
        <iv-language-button style="position: absolute; right: 0; top: 0" />

        <p class="v-title" v-html="_('m_Walkthrough1')" />
        <p class="v-subtitle" v-html="_('m_Walkthrough2')" />

        <iv-form
            class="form"
            ref="form"
            :interface="inf()"
            @submit="doSubmit"
        >
            <template #license="{$attrs, $listeners}">
                <div>
                    <iv-form-license
                        class="license"
                        v-bind="$attrs"
                        v-on="$listeners"
                        label=""
                        />
                    <a class="link" @click="doOffline" v-html="_('m_Walkthrough3')" />
                </div>
            </template>
        </iv-form>

        <template v-if="$vref('form')">
            <iv-button class="v-button register-button" size="lg"
                icon="fa-bolt"
                v-bind="$refs.form.submitBindings.$attrs" v-on="$refs.form.submitBindings.$listeners">
                {{ _('w_Register') }}
            </iv-button>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.main1 {
    .form {
        margin-left: -20px;

        .license {
            margin-top: 30px;
            transform: scale(1.3);
            transform-origin: left;

            & ::v-deep input {
                width: 300px !important;
            }
        }

        .link {
            text-decoration: underline;
            margin-left: 20px;
            cursor: pointer;
        }

        ::v-deep .selection {
            margin-top: 45px;
            transform: scale(1.3);
            transform-origin: left;

            & > div {
                width: 300px !important;
            }
        }
    }

    .register-button {
        margin-top: 30px;
    }
}
</style>

<script lang="ts">
import { GetLicenseMac } from '@/config/default/server';
import { Component, Vue, Emit } from 'vue-property-decorator';
import { ModalLoading } from '@/../components/modal/modal-loading';
import { toEnumInterface } from '@/../core';

@Component
export default class WalkThrough1_License extends Vue {
    /// public
    public clean() {
        (this.$refs.form as any).set("license", "");
    }

    private options: any = {};
    private value: { license: string, mac: string } = {} as any;

    /// united emitter
    @Emit("failed")
    private doFailed(msg: string) { return msg; }

    @Emit("success")
    private doSuccess() {}

    @Emit("offline")
    private doOffline() {}

    /// interface
    private inf() {
        return `
        interface {
            /**
             * @uiType - iv-form-license
             */
            license: string;
            /**
             * @uiAttrs - { label: '', class: 'selection' }
             */
            mac: ${toEnumInterface(this.options, false)};
        }
        `;
    }

    private mounted() {
        this.$server.R("/license/mac")
            .then(response => {
                let firstMac = null;
                this.options = response.reduce((final, value) => {
                    final[value.mac] = `${value.name} - ${value.mac}`;
                    if (!firstMac) firstMac = value.mac;
                    return final;
                }, {});
                firstMac && (this.$refs.form as any).set("mac", firstMac);
            });
    }

    private async doSubmit(data) {
        let modal = new ModalLoading();
        modal.$modal();

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            await this.$server.C("/license", {
                mac: data.mac,
                keyOrData: data.license.toUpperCase()
            }, undefined, undefined, true);
            this.doSuccess();

        } catch(e) { this.doFailed(e.body) } finally {
            modal.close();
        }
    }
}
</script>
