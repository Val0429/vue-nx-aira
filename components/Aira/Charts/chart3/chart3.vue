<template>
    <v-chart @mounted="chart_ready" @unmounted="chart_finished" :option="getOption()" />
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" src="./chart3.vue.ts" />
