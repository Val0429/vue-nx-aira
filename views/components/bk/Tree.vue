<template>
    <div key="main">
        <iv-language-button />
        <iv-theme-button />

        <iv-region-tree
            :server="{ path: '/test/region', groupBy: null }"
        >
            <template #title="{$attrs, $listeners}">
                {{ $attrs.name }}
                <b-badge pill class="ml-2">{{ $attrs.objectId }}</b-badge>
            </template>

            <template #toolbox>
                <iv-toolbox-add />
                <iv-toolbox-delete />
                <iv-toolbox-edit />
                <iv-toolbox-export />
                <iv-toolbox-info />
                <iv-toolbox-view />
                <iv-toolbox-more>
                    <iv-toolbox-add />
                    <iv-toolbox-delete />
                    <iv-toolbox-edit />
                    <iv-toolbox-export />
                    <iv-toolbox-info />
                    <iv-toolbox-view />
                </iv-toolbox-more>
            </template>
        </iv-region-tree>
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
