<template>
    <iv-route-transition>
        <div key="main">

            <iv-language-button />
            <iv-theme-button />

            <iv-card label="Reusable Theme Basic" class="reusable-theme">
                <span class="block" style="background: var(--primary); color: var(--primary-yiq)">--primary</span>
                <span class="block" style="background: var(--secondary); color: var(--secondary-yiq)">--secondary</span>
                <span class="block" style="background: var(--success); color: var(--success-yiq)">--success</span>
                <span class="block" style="background: var(--danger); color: var(--danger-yiq)">--danger</span>
                <span class="block" style="background: var(--warning); color: var(--warning-yiq)">--warning</span>
                <span class="block" style="background: var(--info); color: var(--info-yiq)">--info</span>
                <span class="block" style="background: var(--light); color: var(--light-yiq)">--light</span>
                <span class="block" style="background: var(--dark); color: var(--dark-yiq)">--dark</span>
            </iv-card>

            <iv-card label="Reusable Theme Basic - Bootstrap Way" class="reusable-theme">
                <span class="block bg-primary">--primary</span>
                <span class="block bg-secondary">--secondary</span>
                <span class="block bg-success">--success</span>
                <span class="block bg-danger">--danger</span>
                <span class="block bg-warning">--warning</span>
                <span class="block bg-info">--info</span>
                <span class="block bg-light">--light</span>
                <span class="block bg-dark">--dark</span>
            </iv-card>

            <iv-card label="Reusable Theme Advanced" class="reusable-theme">
                <p>
                    <span class="block" style="background: var(--primary-100); color: var(--primary-yiq)">--primary-100</span>
                    <span class="block" style="background: var(--primary-200); color: var(--primary-yiq)">--primary-200</span>
                    <span class="block" style="background: var(--primary-300); color: var(--primary-yiq)">--primary-300</span>
                    <span class="block" style="background: var(--primary-400); color: var(--primary-yiq)">--primary-400</span>
                    <span class="block" style="background: var(--primary-500); color: var(--primary-yiq)">--primary-500</span>
                    <span class="block" style="background: var(--primary-600); color: var(--primary-yiq)">--primary-600</span>
                    <span class="block" style="background: var(--primary-700); color: var(--primary-yiq)">--primary-700</span>
                    <span class="block" style="background: var(--primary-800); color: var(--primary-yiq)">--primary-800</span>
                    <span class="block" style="background: var(--primary-900); color: var(--primary-yiq)">--primary-900</span>
                </p>

                <p>
                    <span class="block" style="background: var(--secondary-100); color: var(--secondary-yiq)">--secondary-100</span>
                    <span class="block" style="background: var(--secondary-200); color: var(--secondary-yiq)">--secondary-200</span>
                    <span class="block" style="background: var(--secondary-300); color: var(--secondary-yiq)">--secondary-300</span>
                    <span class="block" style="background: var(--secondary-400); color: var(--secondary-yiq)">--secondary-400</span>
                    <span class="block" style="background: var(--secondary-500); color: var(--secondary-yiq)">--secondary-500</span>
                    <span class="block" style="background: var(--secondary-600); color: var(--secondary-yiq)">--secondary-600</span>
                    <span class="block" style="background: var(--secondary-700); color: var(--secondary-yiq)">--secondary-700</span>
                    <span class="block" style="background: var(--secondary-800); color: var(--secondary-yiq)">--secondary-800</span>
                    <span class="block" style="background: var(--secondary-900); color: var(--secondary-yiq)">--secondary-900</span>
                </p>

                <p>
                    <span class="block" style="background: var(--success-100); color: var(--success-yiq)">--success-100</span>
                    <span class="block" style="background: var(--success-200); color: var(--success-yiq)">--success-200</span>
                    <span class="block" style="background: var(--success-300); color: var(--success-yiq)">--success-300</span>
                    <span class="block" style="background: var(--success-400); color: var(--success-yiq)">--success-400</span>
                    <span class="block" style="background: var(--success-500); color: var(--success-yiq)">--success-500</span>
                    <span class="block" style="background: var(--success-600); color: var(--success-yiq)">--success-600</span>
                    <span class="block" style="background: var(--success-700); color: var(--success-yiq)">--success-700</span>
                    <span class="block" style="background: var(--success-800); color: var(--success-yiq)">--success-800</span>
                    <span class="block" style="background: var(--success-900); color: var(--success-yiq)">--success-900</span>
                </p>

                <p>
                    <span class="block" style="background: var(--danger-100); color: var(--danger-yiq)">--danger-100</span>
                    <span class="block" style="background: var(--danger-200); color: var(--danger-yiq)">--danger-200</span>
                    <span class="block" style="background: var(--danger-300); color: var(--danger-yiq)">--danger-300</span>
                    <span class="block" style="background: var(--danger-400); color: var(--danger-yiq)">--danger-400</span>
                    <span class="block" style="background: var(--danger-500); color: var(--danger-yiq)">--danger-500</span>
                    <span class="block" style="background: var(--danger-600); color: var(--danger-yiq)">--danger-600</span>
                    <span class="block" style="background: var(--danger-700); color: var(--danger-yiq)">--danger-700</span>
                    <span class="block" style="background: var(--danger-800); color: var(--danger-yiq)">--danger-800</span>
                    <span class="block" style="background: var(--danger-900); color: var(--danger-yiq)">--danger-900</span>
                </p>

                <p>
                    <span class="block" style="background: var(--warning-100); color: var(--warning-yiq)">--warning-100</span>
                    <span class="block" style="background: var(--warning-200); color: var(--warning-yiq)">--warning-200</span>
                    <span class="block" style="background: var(--warning-300); color: var(--warning-yiq)">--warning-300</span>
                    <span class="block" style="background: var(--warning-400); color: var(--warning-yiq)">--warning-400</span>
                    <span class="block" style="background: var(--warning-500); color: var(--warning-yiq)">--warning-500</span>
                    <span class="block" style="background: var(--warning-600); color: var(--warning-yiq)">--warning-600</span>
                    <span class="block" style="background: var(--warning-700); color: var(--warning-yiq)">--warning-700</span>
                    <span class="block" style="background: var(--warning-800); color: var(--warning-yiq)">--warning-800</span>
                    <span class="block" style="background: var(--warning-900); color: var(--warning-yiq)">--warning-900</span>
                </p>

                <p>
                    <span class="block" style="background: var(--info-100); color: var(--info-yiq)">--info-100</span>
                    <span class="block" style="background: var(--info-200); color: var(--info-yiq)">--info-200</span>
                    <span class="block" style="background: var(--info-300); color: var(--info-yiq)">--info-300</span>
                    <span class="block" style="background: var(--info-400); color: var(--info-yiq)">--info-400</span>
                    <span class="block" style="background: var(--info-500); color: var(--info-yiq)">--info-500</span>
                    <span class="block" style="background: var(--info-600); color: var(--info-yiq)">--info-600</span>
                    <span class="block" style="background: var(--info-700); color: var(--info-yiq)">--info-700</span>
                    <span class="block" style="background: var(--info-800); color: var(--info-yiq)">--info-800</span>
                    <span class="block" style="background: var(--info-900); color: var(--info-yiq)">--info-900</span>
                </p>

                <p>
                    <span class="block" style="background: var(--light-100); color: var(--light-yiq)">--light-100</span>
                    <span class="block" style="background: var(--light-200); color: var(--light-yiq)">--light-200</span>
                    <span class="block" style="background: var(--light-300); color: var(--light-yiq)">--light-300</span>
                    <span class="block" style="background: var(--light-400); color: var(--light-yiq)">--light-400</span>
                    <span class="block" style="background: var(--light-500); color: var(--light-yiq)">--light-500</span>
                    <span class="block" style="background: var(--light-600); color: var(--light-yiq)">--light-600</span>
                    <span class="block" style="background: var(--light-700); color: var(--light-yiq)">--light-700</span>
                    <span class="block" style="background: var(--light-800); color: var(--light-yiq)">--light-800</span>
                    <span class="block" style="background: var(--light-900); color: var(--light-yiq)">--light-900</span>
                </p>

                <p>
                    <span class="block" style="background: var(--dark-100); color: var(--dark-yiq)">--dark-100</span>
                    <span class="block" style="background: var(--dark-200); color: var(--dark-yiq)">--dark-200</span>
                    <span class="block" style="background: var(--dark-300); color: var(--dark-yiq)">--dark-300</span>
                    <span class="block" style="background: var(--dark-400); color: var(--dark-yiq)">--dark-400</span>
                    <span class="block" style="background: var(--dark-500); color: var(--dark-yiq)">--dark-500</span>
                    <span class="block" style="background: var(--dark-600); color: var(--dark-yiq)">--dark-600</span>
                    <span class="block" style="background: var(--dark-700); color: var(--dark-yiq)">--dark-700</span>
                    <span class="block" style="background: var(--dark-800); color: var(--dark-yiq)">--dark-800</span>
                    <span class="block" style="background: var(--dark-900); color: var(--dark-yiq)">--dark-900</span>
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
export default class ThemeStyle extends Vue {
}
</script>

<style lang="scss" scoped>
.reusable-theme .block {
    display: inline-block;
    padding: 8px 12px;
}
</style>