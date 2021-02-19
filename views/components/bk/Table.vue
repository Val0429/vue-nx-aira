<template>
    <div key="main">
        <iv-language-button />
        <iv-theme-button />

        <iv-table
            :server="{ path: '/test/me' }"
            interface="
            interface {
                /**
                 * @uiType - iv-cell-auto-index
                 */
                autoIndex: any;
                objectId: string;
                /**
                 * @uiSortable - true
                 * @uiSearchable - true
                 */
                teststr: string;
                testnumber: string;
                /**
                 * @uiType - iv-cell-switch
                 * @uiSortable - true
                 */
                testboolean: boolean;

                /**
                 * @uiType - iv-cell-date
                 * @uiSortable - desc
                 * @uiSearchable - true
                 */
                createdAt: Date;
                updatedAt: Date;
            }
            "
            />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Table extends Vue {
    private isMounted: boolean = false;
    private doMounted() {
        this.isMounted = true;
    }
}
</script>
