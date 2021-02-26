<template>
    <div class="main">
        <div class="content_border">
            <iv-auto-transition :step="step">
                <WalkThrough1_License key="1" v-show="step==1" ref="walkthrough1"
                    @offline="step=2"
                    @failed="step=9; backStep=1; licenseFailedMessage = $event"
                    @success="step=11"
                    />

                <WalkThrough2_LicensOffline key="2" v-show="step==2"
                    @online="step=1"
                    @failed="step=9; backStep=2; licenseFailedMessage = $event"
                    @success="step=11"
                    />
                
                <WalkThrough9_LicenseFailed key="9" v-show="step==9"
                    :message="licenseFailedMessage"
                    @retry="step=backStep; $refs.walkthrough1.clean();"
                    />
                
                <WalkThrough11_VAST2 key="11" v-show="step==11"
                    @success="step=12"
                    />

                <WalkThrough12_VAST2Cameras key="12" v-show="step==12"
                    />
            </iv-auto-transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100vw;
    height: 100vh;
    background: white;
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

    & /deep/ .v-subtitle2 {
        margin-top: 0;
        font-size: 20px;
        font-weight: bold;
        color: #7E7E7E;
        margin-bottom: 0.2rem;
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
import WalkThrough2_LicensOffline from '@/views/components/WalkThrough/WalkThrough2_LicenseOffline.vue';
import WalkThrough9_LicenseFailed from '@/views/components/WalkThrough/WalkThrough9_LicenseFailed.vue';
import WalkThrough11_VAST2 from '@/views/components/WalkThrough/WalkThrough11_VAST2.vue';
import WalkThrough12_VAST2Cameras from '@/views/components/WalkThrough/WalkThrough12_VAST2Cameras.vue';

@Component({
    components: {
        WalkThrough1_License,
        WalkThrough2_LicensOffline,
        WalkThrough9_LicenseFailed,
        WalkThrough11_VAST2,
        WalkThrough12_VAST2Cameras
    }
})
export default class WalkThrough extends Vue {
    /// 1: Online license
    /// 2: Offline license
    /// 9: License failed
    /// 11: VAST2 credential
    /// 12: VAST2 camera selection
    /// 19: Activation Success
    private step: number = 11;

    /// if going back
    private backStep: number;

    /// license failed
    private licenseFailedMessage: string = "";
}
</script>
