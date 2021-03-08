<template>
    <!-- <iv-route-transition> -->
        <div key="main">test</div>
    <!-- </iv-route-transition> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';
import AlertResponse from '@/../components/modal/alert-response/alert-response.vue';
import ConfirmResponse from '@/../components/modal/confirm-response/confirm-response.vue';

@Component
export default class Logs extends Vue {
    private inf() {
        return `
            interface {
                /**
                 * @uiLabel - ${this._("w_LogAction")}
                 */
                action: string;
                /**
                 * @uiLabel - ${this._("w_LogEntity")}
                 */
                entity: any;
                /**
                 * @uiLabel - ${this._("w_CreatedAt")}
                 */
                createdAt: Date;
            }
        `;
    }
}
</script>
