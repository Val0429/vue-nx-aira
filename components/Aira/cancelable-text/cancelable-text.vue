<template>
    <div class="cancelable-text-border d-flex align-items-center">
        <span>{{ getContent(value) }}</span>
        <iv-icon icon="cancel-cross" class="ml-2" @click="cancel_clicked" />
    </div>
</template>

<style lang="scss" scoped>
.cancelable-text-border {
    background: #00000066;
    padding: 4px 16px;
    color: white;
    border-radius: 20px;
    font-size: 16px;

    .cancel-cross {
        cursor: pointer;
        width: 16px;
        height: 16px;
        background: url("~@/assets/images/cancel-cross.svg");
    }
}
</style>

<script lang="ts" src="./cancelable-text.vue.ts" />
