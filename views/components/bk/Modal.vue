<template>
    <div key="main">
        <iv-language-button />
        <iv-theme-button />

        <p><b-button @click="visible = true">Open Normal Modal</b-button></p>
        <iv-modal label="Modal Title" :visible.sync="visible">
            <div style="width: 2000px; height: 2000px">
                Normal Modal
            </div>
        </iv-modal>

        <p><b-button @click="visible2 = true">Open Form Modal</b-button></p>
        <iv-modal label="Modal Form" :visible.sync="visible2">
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
        </iv-modal>

        <p><b-button @click="visible3 = true">Open Step Modal</b-button></p>
        <iv-modal label="Modal Step" :visible.sync="visible3">
            <iv-step-progress
                style="min-width: 60vw"
                ref="step"
                @mounted="doMounted"
            >

                <template #1>
                    <iv-form :interface="inf1()" />
                </template>
                <template #1-title>註冊帳號</template>

                <template #2>
                    <iv-form :interface="inf2()" />
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
        </iv-modal>

        <p><b-button @click="showModal()">Open Dynamic Modal</b-button></p>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';
import { AlertResponse } from '@/../components/modal/alert-response';

@Component
export default class Modal extends Vue {
    private visible: boolean = false;
    private visible2: boolean = false;
    private visible3: boolean = false;
    private visible4: boolean = false;
    private visible5: boolean = false;

    private showModal() {
        new AlertResponse({
            propsData: {
                label: '123',
                value: 'this is content'
            }
        }).$modal();
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
            /**
             * @uiType - iv-form-ip
             */
            ip: string;
            port: number;
            /**
             * @uiType - iv-form-license
             */
            license: string;
        }
        `;
    }

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

