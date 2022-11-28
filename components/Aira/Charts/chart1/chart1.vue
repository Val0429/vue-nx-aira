<template>
    <v-chart @mounted="chart_ready" ref="chart1" :option="getOption()" />
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" src="./chart1.vue.ts" />
