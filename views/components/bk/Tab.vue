<template>
    <div>
        <iv-language-button />
        <iv-theme-button />

        <iv-tab ref="tab" @mounted="doMount" :active="2">
            <template #1>
                <iv-form
                    ref="form"
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
            </template>
            <template #1-title>
                Hello
            </template>

            <template #2>

                <iv-step-progress
                    ref="step"
                >

                    <template #1>
                        <iv-form :interface="inf1()" />
                    </template>
                    <template #1-title>註冊帳號</template>
                    <template #1-footer-before>
                        <div>test</div>
                    </template>

                    <template #2>
                        <iv-form :interface="inf2()">
                            <template #object="{$attrs, $listeners}">
                                <iv-form-server-object
                                    v-bind="$attrs"
                                    v-on="$listeners"
                                    :server="{ path: '/announcements' }"
                                    />
                            </template>
                        </iv-form>
                    </template>
                    <template #2-title>註冊License</template>

                    <template #3>
                        <iv-form :interface="inf3()" />
                    </template>
                    <template #3-title>選擇時間</template>

                    <template #4>
                        <iv-form :interface="inf4()" />
                    </template>
                    <template #4-title>選擇樓層</template>

                </iv-step-progress>
    
            </template>
            <template #2-title>
                Tab2
            </template>
        </iv-tab>


        <template v-if="isMounted">
            <template v-if="$refs.tab.thisForm">
                <b-button size="lg" v-bind="$refs.tab.thisForm.submitBindings.$attrs" v-on="$refs.tab.thisForm.submitBindings.$listeners">{{ _("wb_Submit") }}</b-button>
                <b-button size="lg" v-bind="$refs.tab.thisForm.resetBindings.$attrs" v-on="$refs.tab.thisForm.resetBindings.$listeners">{{ _("wb_Reset") }}</b-button>
            </template>

            <template v-else-if="$refs.tab.thisStep">
                <b-button size="lg" v-if="$refs.tab.thisStep.currentStep !== 1" v-bind="$refs.tab.thisStep.prevBindings($refs.tab.thisStep.currentStep).$attrs" v-on="$refs.tab.thisStep.prevBindings($refs.tab.thisStep.currentStep).$listeners">{{ $refs.tab.thisStep.prevBindings($refs.tab.thisStep.currentStep).$attrs.label }}</b-button>
                <b-button size="lg" v-bind="$refs.tab.thisStep.nextBindings($refs.tab.thisStep.currentStep).$attrs" v-on="$refs.tab.thisStep.nextBindings($refs.tab.thisStep.currentStep).$listeners">{{ $refs.tab.thisStep.nextBindings($refs.tab.thisStep.currentStep).$attrs.label }}</b-button>
            </template>
        </template>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Tab extends Vue {
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

    private inf1() {
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
        `;
    }

    private inf2() {
        return `
        interface {
            object: any;
        }
        `
    }

    // private inf2() {
    //     return `
    //     interface {
    //         /**
    //          * @uiType - iv-form-ip
    //          */
    //         ip: string;
    //         port: number;
    //         /**
    //          * @uiType - iv-form-license
    //          */
    //         license: string;
    //     }
    //     `;
    // }

    private inf3() {
        return `
        interface {
            /**
             * @uiColumnGroup - date
             */
            starttime: Date;
            /**
             * @uiColumnGroup - date
             */
            endtime: Date;
            enable: boolean;
        }
        `;
    }

    private inf4() {
        return `
        interface {
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

    private isMounted: boolean = false;
    private doMount() {
        this.isMounted = true;
    }
}
</script>
