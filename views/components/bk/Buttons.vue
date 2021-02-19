<template>
    <iv-route-transition>
        <div key="main">

            <iv-language-button />
            <iv-theme-button />

            <iv-card label="Base" class="button-set">
                <p>
                    <iv-button label="Primary" variant="primary" size="sm" />
                    <iv-button label="Secondary" variant="secondary" size="sm" />
                    <iv-button label="Success" variant="success" size="sm" />
                    <iv-button label="Danger" variant="danger" size="sm" />
                    <iv-button label="Warning" variant="warning" size="sm" />
                    <iv-button label="Info" variant="info" size="sm" />
                </p>
                <p>
                    <iv-button label="Primary" variant="primary" size="md" />
                    <iv-button label="Secondary" variant="secondary" />
                    <iv-button label="Success" variant="success" />
                    <iv-button label="Danger" variant="danger" />
                    <iv-button label="Warning" variant="warning" />
                    <iv-button label="Info" variant="info" />
                </p>
                <p>
                    <iv-button label="Primary" variant="primary" size="lg" />
                    <iv-button label="Secondary" variant="secondary" size="lg" />
                    <iv-button label="Success" variant="success" size="lg" />
                    <iv-button label="Danger" variant="danger" size="lg" />
                    <iv-button label="Warning" variant="warning" size="lg" />
                    <iv-button label="Info" variant="info" size="lg" />
                </p>
            </iv-card>

            <iv-card label="With Icon" class="button-set">
                <p>
                    <iv-button label="Primary" icon="fa-star" variant="primary" size="sm" />
                    <iv-button label="Secondary" icon="fa-bell" variant="secondary" size="sm" />
                    <iv-button label="Success" icon="fa-check" variant="success" size="sm" />
                    <iv-button label="Danger" icon="fa-exclamation-circle" variant="danger" size="sm" />
                    <iv-button label="Warning" icon="fa-history" variant="warning" size="sm" />
                    <iv-button label="Info" icon="fa-qrcode" variant="info" size="sm" />
                </p>
                <p>
                    <iv-button label="Primary" icon="fa-star" variant="primary" />
                    <iv-button label="Secondary" icon="fa-bell" variant="secondary" />
                    <iv-button label="Success" icon="fa-check" variant="success" />
                    <iv-button label="Danger" icon="fa-exclamation-circle" variant="danger" />
                    <iv-button label="Warning" icon="fa-history" variant="warning" />
                    <iv-button label="Info" icon="fa-qrcode" variant="info" />
                </p>
                <p>
                    <iv-button label="Primary" icon="fa-star" variant="primary" size="lg" />
                    <iv-button label="Secondary" icon="fa-bell" variant="secondary" size="lg" />
                    <iv-button label="Success" icon="fa-check" variant="success" size="lg" />
                    <iv-button label="Danger" icon="fa-exclamation-circle" variant="danger" size="lg" />
                    <iv-button label="Warning" icon="fa-history" variant="warning" size="lg" />
                    <iv-button label="Info" icon="fa-qrcode" variant="info" size="lg" />
                </p>
            </iv-card>

        </div>
    </iv-route-transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Buttons extends Vue {
}
</script>

<style lang="scss" scoped>
.button-set * {
    margin: 5px;
}
</style>