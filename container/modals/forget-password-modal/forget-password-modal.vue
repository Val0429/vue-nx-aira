<template>
    <iv-modal
        :visible.sync="visible"
        :label="_('m_ForgetPassword')"
        @update:visible="doUpdateVisible"
    >
         <!-- @stepChanged="doStepChanged" @submit="doSubmit" -->
        <iv-step-progress class="content" :validateStep="validateStep">
            <template #1-title>{{ _("m_ForgetPasswordStep1") }}</template>
            <template #1>
                <iv-form ref="form_step_1" :interface="inf_1()" />
            </template>

            <template #2-title>{{ _("m_ForgetPasswordStep2") }}</template>
            <template #2>
                <iv-form ref="form_step_2" :interface="inf_2()" />
            </template>

            <template #3-title>{{ _("m_ForgetPasswordStep3") }}</template>
            <template #3>
                <iv-form ref="form_step_3" :interface="inf_3()" />
            </template>
        </iv-step-progress>
    </iv-modal>
</template>


<script lang="ts" src="./forget-password-modal.vue.ts" />

<style lang="scss" scoped>
.content {
    min-width: 600px;
    margin-bottom: 30px;
}
</style>