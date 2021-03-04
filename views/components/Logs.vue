<template>
    <iv-card :label="_('w_Logs')">
        <iv-table
            :server="{ path: '/logs' }"
            :selectable="false"
            :interface="inf()"
            >
            <template #action="{$attrs}">
                {{ _('m_'+$attrs.value) }}
            </template>

            <template #entity="{$attrs}">
                <!-- EventLicenseRemoved -->
                <fragment v-if="$attrs.row.action == 'EventLicenseRemoved'">
                    {{ _('m_LogEntityNone') }}
                </fragment>
            </template>

        </iv-table>
    </iv-card>
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
