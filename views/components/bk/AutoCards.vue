<template>
    <div>
        <iv-language-button />
        <iv-theme-button />

        <iv-auto-card
            label="Auto Card - Form"
        >
            <iv-form
                interface="
                interface {
                    account: string;
                    password: string;
                }
                "
                />

            <template #footer-before>
                <b>footer-before</b>
            </template>
            <template #footer-after>
                <b>footer-after</b>
            </template>
        </iv-auto-card>

        <iv-auto-card
            label="Auto Card - Step"
        >
            <template #1-footer-before>
                <b>1-footer-before</b>
            </template>
            <template #1-footer-after>
                <b>1-footer-after</b>
            </template>

            <template #2-footer-before>
                <b>2-footer-before</b>
            </template>
            <template #2-footer-after>
                <b>2-footer-after</b>
            </template>

            <iv-step-progress
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

                <template #2-footer-before>
                    <b>2-footer-before</b>
                </template>
                <template #2-footer-after>
                    <b>2-footer-after</b>
                </template>

                <template #3>
                    <iv-form :interface="inf3()" />
                </template>
                <template #3-title>選擇時間</template>

                <template #4>
                    <iv-form :interface="inf4()" />
                </template>
                <template #4-title>選擇樓層</template>

            </iv-step-progress>        
        </iv-auto-card>

        <iv-auto-card
            label="Auto Card - Tab"
        >
            <template #1-footer-before>
                <b>1-footer-before</b>
            </template>
            <template #1-footer-after>
                <b>1-footer-after</b>
            </template>

            <template #2-1-footer-before>
                <b>2-1-footer-before</b>
            </template>
            <template #2-1-footer-after>
                <b>2-1-footer-after</b>
            </template>

            <template #2-2-footer-before>
                <b>2-2-footer-before</b>
            </template>
            <template #2-2-footer-after>
                <b>2-2-footer-after</b>
            </template>

            <iv-tab :active="1">
                <template #1>
                    <iv-form
                        interface="
                        interface {
                            account: string;
                            password: string;
                        }
                        "
                        />
                </template>
                <template #1-title>
                    Form
                </template>

                <template #2>
                    <iv-step-progress
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
                </template>
                <template #2-title>
                    Step
                </template>
            </iv-tab>
        </iv-auto-card>

        <iv-auto-card
            ref="card"
            label="When submit, this card will auto close."
        >
            <iv-form
                interface="
                interface {
                    account: string;
                    password: string;
                }
                "
                @submit="$refs.card.close()"
                />
        </iv-auto-card>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface, Observe } from '@/../core';
import { BehaviorSubject } from 'rxjs';

@Component
export default class AutoCards extends Vue {
    @Observe({
        value: new BehaviorSubject<number>(0)
    })
    test: BehaviorSubject<number>;

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
