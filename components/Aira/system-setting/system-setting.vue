<template>
    <div class="menu d-none d-lg-block">
        <div class="menu-title d-flex align-items-center justify-content-center">
            System Settings
        </div>
        <div class="menu-content">
            <b-card no-body>
                <b-tabs vertical
                    content-class="tab-content"
                    nav-class="tab-nav"
                    nav-wrapper-class="tab-nav-wrapper"
                    class="text-light"
                    >

                    <b-tab active>
                        <template #title>
                            <div class="d-flex flex-row align-items-center ml-2">
                                <span class="title-name ml-3">Network Optix Setting</span>
                            </div>
                        </template>
                        <b-card-text>
                            123
                        </b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    height: calc(100vh - #{$top-height});

    .menu-title {
        height: $menu-title-height;
        border-bottom: 1px solid black;
        border-top: 1px solid #8A9192;
        color: white;
        font-size: 22px;
    }
    .menu-content {
        height: calc(100vh - #{$top-height} - #{$menu-title-height});
        border-top: 1px solid #8A9192;

        /deep/ {
            // tabs container
            .tabs {
                height: calc(100vh - #{$top-height});
            }

            .tab-content {
                border: 0;
                margin-top: 0px;
                border-left: 1px solid #8A9192;
                background: transparent;
            }
            .tab-nav {
                height: calc(100vh - #{$top-height});
                border-bottom: 0;
                font-size: 20px;
                margin-right: -15px;
            }
            /// outer wrapper of nav
            .tab-nav-wrapper {
                width: 320px;
                border: 0;
                margin-top: 0px;
                border-right: 1px solid black;
            }

            .nav-tabs .nav-link {
                span {
                    color: #B4BFC0;
                }

                &.active {
                    background: #2475A068 !important;
                    border: 1px solid transparent !important;
                    span {
                        color: white;
                    }
                }
            }
        }       
    }

    background: url("~@/assets/images/background.png") #354041 right bottom no-repeat;
}
</style>

<script lang="ts" src="./system-setting.vue.ts" />
