<template>
    <div class="main">
        <div class="content_border">
            <iv-auto-transition :step="step">
                <WalkThrough1_License key="1" v-show="step==1" ref="walkthrough1"
                    @failed="step=9; licenseFailedMessage = $event" />
                
                <WalkThrough9_LicenseFailed key="9" v-show="step==9"
                    :message="licenseFailedMessage"
                    @retry="step=1; $refs.walkthrough1.clean();"
                    />
            </iv-auto-transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

    & > .content_border {
        position: relative;
        width: 1364px;
        height: 780px;
        background: url("../../../assets/images/walkthrough-bk.png") 100% 100% no-repeat;
        margin: auto auto;
    }

    & /deep/ .v-title {
        font-size: 55px;
        font-weight: bold;
    }

    & /deep/ .v-subtitle {
        margin-top: 25px;
        font-size: 25px;
        font-weight: bold;
        color: #7E7E7E;
    }

    & /deep/ .v-error {
        margin-top: 30px;
        font-size: 16px;
        font-weight: bold;
        color: #F86D70;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WalkThrough1_License from '@/views/components/WalkThrough/WalkThrough1_License.vue';
import WalkThrough9_LicenseFailed from '@/views/components/WalkThrough/WalkThrough9_LicenseFailed.vue';

@Component({
    components: {
        WalkThrough1_License,
        WalkThrough9_LicenseFailed
    }
})
export default class WalkThrough extends Vue {
    /// 1: Online license
    /// 2: Offline license
    /// 9: License failed
    /// 11: Next
    private step: number = 1;

    /// license failed
    private licenseFailedMessage: string = "";
}
</script>
