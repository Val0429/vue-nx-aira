<template>
    <div>
        <iv-language-button />
        <iv-theme-button />

    <iv-step-progress
        ref="step"
        @mounted="doMounted"
    >

        <template #1>
            <iv-form :interface="inf1()" />
        </template>
        <template #1-title>註冊帳號</template>

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
    
    <template v-if="isMounted">
        <b-button size="lg" v-if="$refs.step.currentStep !== 1" v-bind="$refs.step.prevBindings($refs.step.currentStep).$attrs" v-on="$refs.step.prevBindings($refs.step.currentStep).$listeners">{{ $refs.step.prevBindings($refs.step.currentStep).$attrs.label }}</b-button>
        <b-button size="lg" v-bind="$refs.step.nextBindings($refs.step.currentStep).$attrs" v-on="$refs.step.nextBindings($refs.step.currentStep).$listeners">{{ $refs.step.nextBindings($refs.step.currentStep).$attrs.label }}</b-button>
    </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class StepProgress extends Vue {
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
    private doMounted() {
        this.isMounted = true;
    }
}
</script>
