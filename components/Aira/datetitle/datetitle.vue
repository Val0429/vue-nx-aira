<template>
    <div>
        <div>{{ date.toLocaleDateString() }}</div>
        <div>{{ date.toLocaleTimeString() }}</div>
    </div>
</template>

<script lang="ts" src="./datetitle.vue.ts" />

<style lang="scss" scoped>
div {
    color: #B4BFC0;
    text-align: right;
}
</style>
