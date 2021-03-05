<template>
    <div id="walkthrough-main">
        <div class="content_border">
            <iv-auto-transition :step="step">
                <WalkThrough1_License key="1" v-if="step==1" ref="walkthrough1"
                    @offline="step=2"
                    @failed="step=9; backStep=1; licenseFailedMessage = $event"
                    @success="step=11"
                    />

                <WalkThrough2_LicensOffline key="2" v-if="step==2"
                    @online="step=1"
                    @failed="step=9; backStep=2; licenseFailedMessage = $event"
                    @success="step=11"
                    />
                
                <WalkThrough9_LicenseFailed key="9" v-if="step==9"
                    :message="licenseFailedMessage"
                    @retry="step=backStep"
                    />
                
                <WalkThrough11_VAST2 key="11" v-if="step==11"
                    @success="step=12"
                    />

                <WalkThrough12_VAST2Cameras key="12" v-if="step==12"
                    @success="step=21"
                    />

                <WalkThrough19_Success key="21" v-if="step==21"
                    />
            </iv-auto-transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#walkthrough-main {
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

<style lang="scss">
@font-face {
    font-family: "Century Gothic";
    src: local("Century Gothic"),
         url("./../../../assets/fonts/CenturyGothicRegular.ttf") format("truetype");
}

#walkthrough-main {
    span, div, p, a, label {
        font-family: "Century Gothic", "微軟正黑體";
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
import WalkThrough19_Success from '@/views/components/WalkThrough/WalkThrough19_Success.vue';

@Component({
    components: {
        WalkThrough1_License,
        WalkThrough2_LicensOffline,
        WalkThrough9_LicenseFailed,
        WalkThrough11_VAST2,
        WalkThrough12_VAST2Cameras,
        WalkThrough19_Success
    }
})
export default class WalkThrough extends Vue {
    /// 1: Online license
    /// 2: Offline license
    /// 9: License failed
    /// 11: VAST2 credential
    /// 12: VAST2 camera selection
    /// 19: Activation Success
    private step: number = 1;

    /// if going back
    private backStep: number;

    /// license failed
    private licenseFailedMessage: string = "";
}
</script>
