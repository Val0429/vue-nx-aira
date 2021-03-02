<template>
    <div class="main1">
        <iv-language-button style="position: absolute; right: 0; top: 0" />

        <p class="v-title" v-html="_('m_Walkthrough26')" />
        <p class="v-subtitle" v-html="_('m_Walkthrough27')" />
        <p class="v-subtitle" style="margin-top: 90px" v-html="_('m_Walkthrough28')" />
        <p class="v-subtitle3" v-html="_('m_Walkthrough29', ['/'])" />
    </div>
</template>

<style lang="scss" scoped>
.main1 {
    > .v-subtitle3 {
        margin-top: 40px;
        font-size: 25px;
        font-weight: normal;
        color: #7E7E7E;
    }
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class WalkThrough19_Success extends Vue {
    @Prop({ type: String, required: false })
    message: string;

    private mounted() {
        setTimeout(() => {
            this.$router.push("/");
        }, 5000);
    }
}
</script>
