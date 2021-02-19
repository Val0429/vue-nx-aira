<template>
    <div>
        <iv-language-button />
        <iv-theme-button />

        <iv-card
            label="Normal Toolbox"
        >
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
        </iv-card>

        <iv-card
            label="Dropdown"
        >
            <iv-toolbox-more>
                <iv-toolbox-add />
                <iv-toolbox-delete />
                <iv-toolbox-edit />
                <iv-toolbox-export />
                <iv-toolbox-info />
                <iv-toolbox-view />
            </iv-toolbox-more>
        </iv-card>

        <iv-card
            label="Card Header"
        >
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
                <iv-toolbox-divider />
            </template>
        </iv-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Toolbox extends Vue {
    private isMounted: boolean = false;
    private doMounted() {
        this.isMounted = true;
    }
}
</script>
