<template>
    <div>
        <iv-language-button />
        <iv-theme-button />

    <iv-form
        v-if="visible"
        ref="formori"
        :interface="inf()"
    >
        <template #object="{$attrs, $listeners}">
            <iv-form-server-object
                v-bind="$attrs"
                v-on="$listeners"
                :server="{ path: '/announcements' }"
                />
        </template>
    </iv-form>

    <template v-if="$vref('formori')">
        <b-button size="lg" v-bind="$refs.formori.submitBindings.$attrs" v-on="$refs.formori.submitBindings.$listeners">{{ _("wb_Submit") }}</b-button>
        <b-button size="lg" v-bind="$refs.formori.resetBindings.$attrs" v-on="$refs.formori.resetBindings.$listeners">{{ _("wb_Reset") }}</b-button>
    </template>

    <h1 style="margin-top: 50px">Interactive Form</h1>

    {{ $form('form') }}
    <iv-form
        ref="form"
        :interface="inf2()"
        />
    
    <template v-if="$vref('form')">
        <b-button size="lg" v-bind="$refs.form.submitBindings.$attrs" v-on="$refs.form.submitBindings.$listeners">{{ _("wb_Submit") }}</b-button>
        <b-button size="lg" v-bind="$refs.form.resetBindings.$attrs" v-on="$refs.form.resetBindings.$listeners">{{ _("wb_Reset") }}</b-button>
    </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Forms extends Vue {
    private visible: boolean = true;

    private inf2() {
        return `
        interface {
            sex: enum {
                "女" = 0,
                "男" = 1
            };
            /**
             * @uiHidden - ${this.$form('form', 'sex') == 1 ? false : true}
             */
            millitary: enum {
                "未服役" = 0,
                "已服役" = 1
            };

            /**
             * @uiHidden - ${this.$form('form', 'sex') == 1 && this.$form('form', 'millitary') == 1 ? false : true}
             */
            millitaryType: enum {
                "陸軍" = 0,
                "海軍" = 1,
                "空軍" = 2
            };
        }
        `;
    }

    private inf() {
        return `
        interface {
            account: string;
            /**
             * @uiType - iv-form-password
             */
            password: string;
            /**
             * @uiType - iv-form-password
             * @uiValidation - (value, all) => value === all.password
             * @uiInvalidMessage - Password should be the same.
             */
            confirmpassword: string;
            /**
             * @uiType - iv-form-ip
             */
            ip: string;
            port: number;
            /**
             * @uiType - iv-form-license
             */
            license: string;
            hello: interface {
                test: string;
                num: number;
            }[];
            /**
             * @uiColumnGroup - date
             */
            starttime: Date;
            /**
             * @uiColumnGroup - date
             */
            endtime: Date;
            enable: boolean;
            object: any;
            selection: ${toEnumInterface({
                '0': 'Admin',
                '1': 'User'
            }, false)};
            multiple: ${toEnumInterface({
                '0': 'VIP',
                '1': 'Guard',
                '2': 'Blacklist',
                '3': 'Visitor'
            }, true)};
        }
        `;
    }
}
</script>
