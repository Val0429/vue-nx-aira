<template>
    <span :class="value >= refValue ? 'normal' : 'loss'">
        <template v-if="type == 'normal'">
            {{ getPercentText(value/refValue) }}
        </template>
        <template v-else>
            {{ getPercentText((1-value/refValue)*(-1)) }}
        </template>
    </span>
</template>

<script lang="ts" src="./percent-text.vue.ts" />

<style lang="scss" scoped>
span.loss {
    color: green;
    font-weight: bold;
}
</style>