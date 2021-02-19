<template>
    <div key="main">
        <iv-language-button />
        <iv-theme-button />

        <iv-form-selection
            :options="[{ id: 'iv-direction-slide', text: 'Direction' }, { id: 'iv-fade-slide', text: 'Fade' }]"
            v-model="type"
            />

        <iv-auto-transition :step="step" :type="type">
            <iv-card key="1" v-if="step === 1">
                <template #toolbox>
                    <iv-toolbox-add @click="step = 2" />
                </template>
                <iv-table
                    :server="{ path: '/test/me' }"
                    interface="
                    interface {
                        /**
                        * @uiType - iv-cell-auto-index
                        */
                        autoIndex: any;
                        objectId: string;
                        teststr: string;
                        testnumber: string;
                        /**
                        * @uiType - iv-cell-switch
                        */
                        testboolean: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    }
                    "
                    />
            </iv-card>

            <iv-auto-card key="2" v-if="step === 2">
                <template #toolbox>
                    <iv-toolbox-add @click="step = 1" />
                </template>
                <iv-form
                    interface="
                    interface {
                        account: string;
                        password: string;
                    }
                    "
                    />
            </iv-auto-card>

        </iv-auto-transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Transition extends Vue {
    private step: number = 1;
    private type: string = "iv-direction-slide";

    private isMounted: boolean = false;
    private doMounted() {
        this.isMounted = true;
    }
}
</script>

