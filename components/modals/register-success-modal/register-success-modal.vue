<template>
    <iv-modal
        :visible.sync="visible"
        :label="_('w_Success')"
        @update:visible="doUpdateVisible"
    >
        <div class="content" v-html="_('m_RegisterSuccessBody')" />

    </iv-modal>
</template>


<script lang="ts" src="./register-success-modal.vue.ts" />

<style lang="scss" scoped>
.content {
    margin-bottom: 30px;
}
</style>