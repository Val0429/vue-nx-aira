<template>
    <iv-form-quick ref="quick">
        <!-- 50) custom view templates with <template #view.* /> -->
        <!-- 51) custom edit / add template with <template #add.* /> -->
        <template #view.config.enable="{$attrs, $listeners}">
            <iv-cell-switch
                v-bind="$attrs"
                v-on="$listeners"
                @input="doSwitchChanged($event, $attrs)"
                />
        </template>
    </iv-form-quick>
</template>

<script lang="ts" src="./cameras.vue.ts" />

<style lang="scss" scoped>
// ::v-deep {
//     .form-group {
//         margin-bottom: -7px !important;
//     }
// }
</style>