<template>
    <fragment>
        <!-- filter -->
        <iv-button class="b-icon-filter" icon="v-icon-filter" variant="dark" @click="filterEnabled=!filterEnabled" />
        <!-- menu -->
        <iv-auto-transition :step="filterEnabled ? 1 : 2" class="menu-transition">
            <div key="1" v-show="filterEnabled" class="menu">
                <div class="menu-title">
                    <iv-button class="b-icon-filter" icon="v-icon-filter" variant="primary" style="float: right" @click="filterEnabled=!filterEnabled" />
                    <div style="font-size: 20px; line-height: 23px; color: white; margin-left: 20px; padding-top: 22px">Filter</div>
                </div>
                <div class="menu-content">
                    <ivc-card ref="card-camera" label="Camera" icon="fa-video-camera" :class="{ 'flex-fill-zero': ($vref('card-camera')||{}).isVisible }">
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                        Cameras<BR/>
                    </ivc-card>
                    <ivc-separator />
                    <ivc-card ref="card-attributes" label="Attributes" icon="fa-video-camera" :class="{ 'flex-fill-zero': ($vref('card-attributes')||{}).isVisible }">
                        Attributes
                    </ivc-card>
                    <ivc-separator />
                    <ivc-card label="Time Period" icon="fa-clock-o">
                        Time Period
                    </ivc-card>
                    <div :class="{ 'flex-fill': !($vref('card-camera')||{}).isVisible && !($vref('card-attributes')||{}).isVisible }" />
                    <ivc-separator />
                    <div class="buttons">
                        <iv-button variant="dark" size="lg">Now</iv-button>
                        <iv-button variant="primary" size="lg">Apply</iv-button>
                    </div>
                </div>
            </div>
            <div key="2" v-if="!filterEnabled" class="menu-holder" />
        </iv-auto-transition>
    </fragment>
</template>

<script lang="ts" src="./menu.vue.ts" />

<style lang="scss" scoped>
/// Filter Button
.b-icon-filter {
    width: 32px;
    height: 32px;
    padding: 0;
    padding-left: 3px;
    margin: 17px;
    margin-left: 20px;

    /deep/ .v-icon-filter {
        margin-left: -6px;
        width: 18px;
        height: 16px;
        background: url("~@/assets/images/filter.svg");
        border-radius: 0 !important;
    }
}

.menu, .menu-holder, .menu-transition {
    width: $menu-width;
}
.menu-transition {
    position: absolute;
    top: 0;
}
.menu, .menu-holder {
    height: calc(100vh - #{$top-height}) !important;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    background: transparent;
}

.menu {
    z-index: 1000;
    background: #4D5758;

    > .menu-title {
        border-top: 0;
        border-bottom: 1px solid black;
        box-sizing: border-box;
        height: calc(#{$menu-title-height} - 1px);
    }

    > .menu-content {
        box-sizing: border-box;
        border-top: 1px solid #8A9192;
        height: calc(100vh - #{$top-height} - #{$menu-title-height});
        display: flex;
        flex-direction: column;

        /deep/ .card {
            transition: flex-grow 500ms ease-in-out;
            overflow-y: hidden;

            &.flex-fill-zero {
                flex: 1 1 0;
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
</style>

