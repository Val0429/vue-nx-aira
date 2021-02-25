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
                    <router-link class="link" to="/walkthrough/2" v-html="_('m_Walkthrough3')" />
                </div>
            </template>

            <template #mac="{$attrs, $listeners}">
                <iv-form-selection
                    class="selection"
                    :options="options"
                    v-bind="$attrs"
                    v-on="$listeners"
                    label=""
                    />
            </template>
        </iv-form>

        <template v-if="$vref('form')">
            <b-button class="register-button" size="lg" v-bind="$refs.form.submitBindings.$attrs" v-on="$refs.form.submitBindings.$listeners">{{ _("w_Register") }}</b-button>
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

            & /deep/ input {
                width: 260px !important;
            }
        }

        .link {
            text-decoration: underline;
            margin-left: 20px;
        }

        .selection {
            margin-top: 45px;
            transform: scale(1.3);
            transform-origin: left;

            & /deep/ > div {
                width: 260px !important;
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

@Component
export default class WalkThrough1_License extends Vue {
    /// public
    public clean() {
        (this.$refs.form as any).set("license", "");
    }

    private options: {id: string, text: string}[] = [];
    private value: { license: string, mac: string } = {} as any;

    /// united emitter
    @Emit("failed")
    private doFailed(msg: string) { return msg; }

    /// interface
    private inf() {
        return `
        interface {
            /**
             * @uiType - iv-form-license
             */
            license: string;
            mac: string;
        }
        `;
    }

    private mounted() {
        this.$server.R("/license/mac")
            .then(response => {
                this.options = response.reduce((final, value) => {
                    final.push({ id: value.mac, text: `${value.name} - ${value.mac}` });
                    return final;
                }, []);
                if (this.options.length > 0) {
                    (this.$refs.form as any).set("mac", this.options[0].id);
                }
            });
    }

    private async doSubmit(data) {
        let modal = new ModalLoading();
        modal.$modal();

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {   
            await this.$server.C("/license", {
                mac: data.mac,
                keyOrData: data.license
            }, undefined, undefined, true);

            console.log("no error");
        } catch(e) { this.doFailed(e.body) } finally {
            modal.close();
        }
    }
}
</script>
