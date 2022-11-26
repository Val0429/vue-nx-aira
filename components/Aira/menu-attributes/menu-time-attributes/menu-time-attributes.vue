<template>
    <div class="d-flex align-items-center host">
        <span class="title">{{label}}: </span>
        <span class="content">{{ getContent(value) }}</span>
    </div>
</template>

<style lang="scss" scoped>
.host {
    margin-left: 20px;
    margin-right: 10px;

    .title {
        color: #B4BFC0;
        font-size: 16px;
        margin-right: 12px;
    }

    .content {
        color: white;
        font-size: 16px;
    }
}
</style>

<script lang="ts" src="./menu-time-attributes.vue.ts" />
