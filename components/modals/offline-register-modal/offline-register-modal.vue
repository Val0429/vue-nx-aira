<template>
    <iv-modal
        :visible.sync="visible"
        :label="_('m_RegisterOnline')"
        @update:visible="doUpdateVisible"
    >
        <iv-form
            style="min-width: 500px"
            :interface="inf()"
            :value="value"
            @submit="doSubmit"
            />
    </iv-modal>
</template>


<script lang="ts" src="./offline-register-modal.vue.ts" />

<style lang="scss" scoped>
.content {
    min-width: 400px;
    margin-bottom: 30px;
}
</style>