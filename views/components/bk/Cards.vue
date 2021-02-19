<template>
    <iv-route-transition>
        <div key="main">

            <iv-language-button />
            <iv-theme-button />

            <iv-card
                label="Simple Card"
            >
                <template #toolbox>
                    <iv-toolbox-add :disabled="true" />
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

                You can put any contents inside here.

                <template #footer>
                    You can define any footer.
                </template>
            </iv-card>

            <iv-card
                label="Color Style"
            >
                <template #footer>
                    <b-button variant="primary" size="lg">Primary</b-button>
                    <b-button variant="secondary" size="lg">Secondary</b-button>
                    <b-button variant="success" size="lg">Success</b-button>
                    <b-button variant="danger" size="lg">Danger</b-button>
                    <b-button variant="warning" size="lg">Warning</b-button>
                    <b-button variant="info" size="lg">Info</b-button>
                </template>
            </iv-card>

        </div>
    </iv-route-transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Cards extends Vue {
    private isMounted: boolean = false;
    private doMounted() {
        this.isMounted = true;
    }
}
</script>

<style lang="scss" scoped>
.test {
    background: var(--secondary);
}
</style>