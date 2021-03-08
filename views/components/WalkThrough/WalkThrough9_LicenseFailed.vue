<template>
    <div class="main1">
        <iv-language-button style="position: absolute; right: 0; top: 0" />

        <p class="v-title" v-html="_('m_Walkthrough4')" />
        <p class="v-subtitle" v-html="_('m_Walkthrough5')" />
        <p class="v-error" v-html="_('m_Walkthrough6', {message})" />

        <iv-button class="v-button retry-button" size="lg" icon="fa-repeat" @click="doRetry">{{_('m_TryAgain')}}</iv-button>
    </div>
</template>

<style lang="scss" scoped>
.main1 {
    .retry-button {
        margin-top: 50px;
    }
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class WalkThrough9_LicenseFailed extends Vue {
    @Prop({ type: String, required: false })
    message: string;

    @Emit("retry")
    private doRetry() {}
}
</script>
