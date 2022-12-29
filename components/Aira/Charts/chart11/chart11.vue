<template>
    <v-chart @mounted="chart_ready" @unmounted="chart_finished" :option="getOption()" @click="chart_clicked" />
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" src="./chart11.vue.ts" />
