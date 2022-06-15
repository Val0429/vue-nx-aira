<template>
    <span :class="value >= refValue ? 'normal' : 'loss'">
    {{ getPercentText((1-value/refValue)*(-1)) }}
    </span>
</template>

<script lang="ts" src="./percent-text.vue.ts" />

<style lang="scss" scoped>
span.loss {
    color: green;
    font-weight: bold;
}
</style>