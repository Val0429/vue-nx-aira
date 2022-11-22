<template>
    <div class="app theme-airablack" id="app">
        <div class="header">
            <div class="logo" />
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/investigation">Investigation</router-link>
        </div>
        <div class="content-header">
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
                    </div>
                </div>
                <div key="2" v-if="!filterEnabled" class="menu-holder" />
            </iv-auto-transition>
        </div>
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
body * {
    font-style: normal;
    font-family: Helvetica, 微軟正黑體, Arial, sans-serif;
}
</style>

<style lang="scss" scoped>
$height: 60px;
$height-menu-title: 67px;

#app {
    background: url("~@/assets/images/background.png") #354041 right bottom no-repeat;
    height: 100vh;

    > .header:first-child {
        position: relative;
        height: $height;
        text-align: center;
        background: #00000033;
        mix-blend-mode: normal;
        box-sizing: border-box;
        border-bottom: 1px solid black;
        
        .logo {
            margin: 0;
            position: absolute;
            left: 25px; top: 50%;
            transform: translateY(-50%);
            width: 150px;
            height: 20px;
            background: url("~@/assets/images/aira.svg");
        }

        > a {
            display: inline-block;
            height: 100%;
            font-size: 22px;
            line-height: $height;
            padding: 0 45px;
            color: #B4BFC0;

            &:hover {
                text-decoration: none;
            }
            &.active {
                font-weight: 700;
                color: #43A0D1;
            }
        }
    }

    .content-header {
        position: relative;
        border-top: 1px solid #8A9192;
        border-bottom: 1px solid black;
        box-sizing: border-box;
        height: $height-menu-title;
        max-height: $height-menu-title;

        /// Filter Button
        .b-icon-filter {
            width: 32px;
            height: 32px;
            padding: 0;
            padding-left: 3px;
            margin: 17px;
            margin-left: 20px;

            /deep/ .v-icon-filter {
                margin-left: 2px;
                width: 18px;
                height: 16px;
                background: url("~@/assets/images/filter.svg");
                border-radius: 0 !important;
            }
        }

        .menu, .menu-holder, .menu-transition {
            width: 236px;
        }
        .menu-transition {
            position: absolute;
            top: 0;
        }
        .menu, .menu-holder {
            height: calc(100vh - 60px) !important;
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
                height: calc(#{$height-menu-title} - 1px);
            }

            > .menu-content {
                box-sizing: border-box;
                border-top: 1px solid #8A9192;
            }
        }
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterTheme } from '@/../core/theme';
import { CoreUI as CoreUIBase,
    SidebarHeader, SidebarNav, SidebarNavTitle, SidebarNavDivider, SidebarNavItem
// } from '@/../containers/CoreUI';
} from './Aira-Black';
import template from './CoreUI.template';

@RegisterTheme('coreui', 'mb_iSAP_Theme_White')
@Component({
    components: {
        CoreUIBase,
        SidebarHeader, SidebarNav, SidebarNavTitle, SidebarNavDivider, SidebarNavItem
    }
})
export default class CoreUI extends Vue {
    filterEnabled: boolean = false;
}
</script>