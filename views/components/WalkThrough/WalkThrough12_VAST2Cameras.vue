<template>
    <div class="main1">
        <iv-language-button style="position: absolute; right: 0; top: 0" />

        <p class="v-title" v-html="_('m_Walkthrough15')" />
        <p class="v-subtitle" v-html="_('m_Walkthrough22')" />

        <div class="block">
            <div class="menu">
                <iv-toolbox-custom class="refresh-button" icon="fa-refresh" variant="white" size="lg" @click="doRefresh" />
                <span class="title" v-html="_('m_Walkthrough23')" />
                <span class="right" v-html="_('m_Walkthrough24', [this.selectedCount, maxCameras])" />
            </div>
            <div class="scrollbar-border">
                <div v-if="cameras.length === 0" class="placeholder" v-html="_('m_Walkthrough25')" />
                <iv-scrollbar v-else class="scrollbar">
                    <template v-for="(camera, index) in cameras">
                        <div :key="index" :class="{ 'camera-unit': true, disabled: selectedCount >= maxCameras && !camera.config.enable }">
                            <span class="name">{{ camera.refName }}</span>
                            <iv-form-switch class="switch" v-model="camera.config.enable" />
                            <span class="right" v-html="camera.config.enable ? _('w_Enabled') : _('w_Disabled')" />
                        </div>
                    </template>
                </iv-scrollbar>
            </div>

            <iv-button class="v-button finish-button" @click="doSubmit" icon="fa-check" :disabled="selectedCount==0" size="lg">{{ _("w_Finish") }}</iv-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main1 {
    > .block {
        width: 570px;

        .menu {
            .title {
                font-size: 12px;
                color: #7E7E7E;
                margin-top: 2px;
                margin-left: 8px;
                cursor: default;
            }
            .right {
                float: right;
                font-size: 12px;
                margin-top: 10px;
                color: #7E7E7E;
                cursor: default;
            }
            .refresh-button {
                /deep/ button {
                    color: #7E7E7E;
                }
            }
        }

        .scrollbar-border {
            border-top: 2px solid #DBDBDB;
            border-bottom: 2px solid #DBDBDB;
            padding: 15px 0;
            height: 412px;
            
            > .scrollbar {
                height: 382px;
            }

            > .hidden {
                 display: none;
            }

            .camera-unit {
                clear: both;
                height: 30px;
                margin-left: 10px;
                margin-right: 22px;

                > .name {
                    color: #7E7E7E;
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 30px;
                    cursor: default;
                }

                > .switch {
                    float: right;
                    margin-top: 2px;
                }

                > .right {
                    margin-top: 5px;
                    margin-right: 12px;
                    float: right;
                    color: #7E7E7E;
                    font-size: 11px;
                    cursor: default;
                }

                &.disabled {
                    > .name {
                        opacity: 0.5;
                    }
                    > .switch {
                        pointer-events: none;
                        opacity: 0.5;
                    }
                    > .right {
                        opacity: 0.5;
                    }
                }
            }
            .placeholder {
                height: 100px;
                margin-top: 15px;
                color: #CCCCCC;
                text-align: center;
                font-size: 20px;
            }
        }

        .finish-button {
            float: right;
            width: 150px;
            margin-top: 25px;
            margin-left: 6px;
            transform: scale(1.05);
            transform-origin: left;
        }
    }
}
</style>

<script lang="ts">
import { GetCameras, GetLicenseMac } from '@/config/default/server';
import { Component, Vue, Emit } from 'vue-property-decorator';
import { ModalLoading } from '@/../components/modal/modal-loading';

@Component
export default class WalkThrough12_VAST2Cameras extends Vue {
    private cameras: GetCameras.Output[] = [];
    private maxCameras: number = 0;

    /// united emitter
    @Emit("success")
    private doSuccess() {}

    private mounted() {
        /// sync camera
        this.doRefresh();
        /// load license
        this.doLicenseRefresh();
    }

    private get selectedCount() {
        return this.cameras.reduce((final, value) => {
            return value.config.enable ? final+1 : final;
        }, 0);
    }

    private async doLicenseRefresh() {
        this.$server.R("/license")
            .then(response => {
                this.maxCameras = (response.summary[response.productKey]||{}).totalCount || 0;
            });
    }

    private async doRefresh() {
        let modal = new ModalLoading();
        modal.$modal();

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            this.$server.R("/cameras/sync")
                .then(response => {
                    this.cameras = response.results.map(camera => {
                        if (!camera.config) camera.config = { enable: false }
                        return camera;
                    });
                });

        } catch(e) {

        } finally {
            modal.close();
        }
    }

    private async doSubmit(data) {
        let modal = new ModalLoading();
        modal.$modal();

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            /// save all cameras
            for (let camera of this.cameras) {
                let { objectId, config } = (camera as any);
                await this.$server.U("/cameras", {
                    objectId, config
                });
            }
            this.doSuccess();

        } catch(e) {
            /*this.doFailed(e.body) */
        } finally {
            modal.close();
        }
    }
}
</script>
