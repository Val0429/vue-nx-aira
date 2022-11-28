<template>
    <div class="content-header">
        <!-- filter -->
        <iv-button v-b-toggle.sidebar-menu class="b-icon-filter" icon="v-icon-filter" variant="dark" />
        <!-- menu -->
        <b-sidebar id="sidebar-menu" bg-variant="sidebar-menu" no-header shadow>
            <div class="menu d-none d-lg-block">
                <div class="menu-title">
                    <iv-button v-b-toggle.sidebar-menu class="b-icon-filter" icon="v-icon-filter" variant="primary" style="float: right" @click="filterEnabled=!filterEnabled" />
                    <div style="font-size: 20px; line-height: 23px; color: white; margin-left: 20px; padding-top: 22px">Filter</div>
                </div>
                <div class="menu-content">
                    <ivc-card ref="card-timeperiod" label="Time Period" icon="v-time-period" :class="{ 'sticky-time-period': ($vref('card-timeperiod')||{}).isVisible, 'time-period': !($vref('card-timeperiod')||{}).isVisible }" >
                        <iv-form
                            ref="form_timeperiod"
                            :value="timeperiod_value$"
                            v-stream:submit="timeperiod_value$"
                            :interface="tp_interface()"
                            />
                    </ivc-card>
                    <ivc-separator />
                    <ivc-card ref="card-camera" label="Camera" icon="v-camera" :class="{ 'flex-fill-zero': ($vref('card-camera')||{}).isVisible }">
                        <iv-form
                            ref="form_camera"
                            :value="camera_value$"
                            v-stream:submit="camera_value$"
                            :interface="cam_interface()"
                            />
                    </ivc-card>
                    <ivc-separator />
                    <ivc-card ref="card-attributes" label="Attributes" icon="v-attributes" :class="{ 'flex-fill-zero': ($vref('card-attributes')||{}).isVisible }">
                        <iv-form
                            ref="form_attribute"
                            :value="attribute_value$"
                            v-stream:submit="attribute_value$"
                            :interface="att_interface()"
                            />
                    </ivc-card>
                    <div :class="{ 'flex-fill': !($vref('card-camera')||{}).isVisible && !($vref('card-attributes')||{}).isVisible }" />
                    <ivc-separator />
                    <div class="buttons">
                        <iv-button variant="dark" size="lg">Now</iv-button>
                        <iv-button variant="primary" size="lg" @click="form_submit()">Apply</iv-button>
                    </div>
                </div>
            </div>
            <div class="menu-small d-flex d-lg-none flex-row">
                <div class="menu-left">
                    <div class="menu-title d-flex flex-row align-items-center">
                        <iv-button v-b-toggle.sidebar-menu class="b-icon-filter" icon="v-icon-filter" variant="primary"" />
                        <div style="flex: 1; font-size: 20px; line-height: 23px; color: white">Filter</div>
                    </div>
                </div>
                <div class="menu-right">
                    456
                </div>
            </div>
        </b-sidebar>

        <!-- Camera Label -->
        <ivc-menu-camera-attributes label="Camera" :value="camera_value$" :items="cameras$" />
        <!-- Attribute Label -->
        <ivc-menu-camera-attributes label="Attribute" :value="attribute_value$" :items="attributes$" />
        <!-- TimePeriod Label -->
        <ivc-menu-time-attributes :value="timeperiod_value$" />
    </div>
</template>

<script lang="ts" src="./menu.vue.ts" />

<style lang="scss">
.bg-sidebar-menu {
    background: #4D5758F8;
}
</style>

<style lang="scss" scoped>
.content-header {
    position: relative;
    border-top: 1px solid #8A9192;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    height: $menu-title-height;
    max-height: $menu-title-height;
    display: flex;
    align-items: center;

    /// Filter Button
    .b-icon-filter {
        width: 32px;
        height: 32px;
        padding: 0;
        margin: 17px;
        margin-left: 20px;

        /deep/ .v-icon-filter {
            margin-top: 1px;
            width: 18px;
            height: 16px;
            background: url("~@/assets/images/filter.svg");
            border-radius: 0 !important;
        }
    }

    /deep/ #sidebar-menu {
        margin-top: $top-height;

        width: 100vw;
        @media (min-width: 992px) { width: 320px; }

        .menu-small {
            width: 100vw;
            height: calc(100vh - #{$top-height});

            > .menu-left, .menu-right {
                color: white;
            }
            > .menu-left {
                flex: 0 0 185px;
                border-right: 1px solid black;
            }
            > .menu-right {
                flex: 1;
                border-left: 1px solid #8A9192;
            }
        }

        .menu {
            height: calc(100vh - #{$top-height}) !important;
            z-index: 1000;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
            overflow: hidden;

            > .menu-title {
                border-top: 1px solid #8A9192;
                border-bottom: 1px solid black;
                box-sizing: border-box;
                height: $menu-title-height;
            }

            > .menu-content {
                box-sizing: border-box;
                border-top: 1px solid #8A9192;
                height: calc(100vh - #{$top-height} - #{$menu-title-height});
                display: flex;
                flex-direction: column;

                .card {
                    transition: flex-grow 300ms ease-in-out, flex-basis 300ms ease-in-out;
                    overflow-y: hidden;
                    
                    &.sticky-time-period {
                        flex: 0 0 238px;
                    }
                    &.time-period {
                        flex: 0 0 54px;
                    }

                    &.flex-fill-zero {
                        flex: 1 1 0;
                    }

                    .v-time-period {
                        width: 16px;
                        height: 16px;
                        background: url("~@/assets/images/time-period.svg");
                    }
                    .v-camera {
                        width: 20px;
                        height: 10px;
                        background: url("~@/assets/images/camera.svg");
                    }
                    .v-attributes {
                        width: 18px;
                        height: 18px;
                        background: url("~@/assets/images/attributes.svg");
                    }
                }

                .buttons {
                    display: flex;
                    padding: 10px 10px;
                    > * {
                        margin: 10px;
                        flex: 1;
                    }
                }
            }
        }
    }
}
</style>

