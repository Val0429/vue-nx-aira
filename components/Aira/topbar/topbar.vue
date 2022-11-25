<template>
    <div class="header justify-content-center">
        <div class="logoarea d-flex flex-row align-items-center">
            <button v-b-toggle.sidebar-1 class="navbar-toggler flex-fill mr-2 d-block d-lg-none" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon v-icon-show-menu"></span>
            </button>
            <div class="logo" />
        </div>
        <b-sidebar id="sidebar-1" bg-variant="sidebar" no-header shadow>
            <template #default="{ hide }">
                <iv-button variant="transparent" size="lg" icon="v-icon-close" @click="hide()" />
                <div class="mx-4 mb-2" style="border-top: 1px solid #8A9192"></div>
                <router-link to="/dashboard">Dashboard</router-link>
                <router-link to="/investigation">Investigation</router-link>
                <router-link to="/case">Case</router-link>
            </template>
        </b-sidebar>

        <div class="navs d-none d-lg-block">
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/investigation">Investigation</router-link>
            <router-link to="/case">Case</router-link>
        </div>

        <ivc-datetitle class="datetitle" />
    </div>
</template>

<script lang="ts" src="./topbar.vue.ts" />

<style lang="scss">
.bg-sidebar {
    background: #111111DD;
}
</style>

<style lang="scss" scoped>
.header {
    position: relative;
    height: $top-height;
    background: #00000033;
    mix-blend-mode: normal;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    
    .logoarea {
        position: absolute;
        left: 25px; top: 50%;
        transform: translateY(-50%);

        /// Show Menu Button
        .v-icon-show-menu {
            background-image: url("~@/assets/images/show-menu.svg");
        }

        .logo {
            margin: 0;
            width: 150px;
            height: 20px;
            background: url("~@/assets/images/aira.svg");
        }        
    }

    .datetitle {
        position: absolute;
        right: 25px; top: 50%;
        transform: translateY(-50%);
    }

    .navs {
        text-align: center;
    }
    .navs > a, .b-sidebar-body > a {
        display: inline-block;
        font-size: 22px;
        line-height: $top-height;
        padding: 0px 45px;
        color: #B4BFC0 !important;

        &:hover {
            text-decoration: none;
        }
        &.active {
            font-weight: 700;
            color: #43A0D1 !important;
        }
    }
    .b-sidebar-body > a {
        display: block;
        padding-left: 35px;
    }

    /// Clear Button
    /deep/ .v-icon-close {
        width: 16px;
        height: 16px;
        background-image: url("~@/assets/images/close.svg") !important;
    }
    button:has(> .v-icon-close) {
        margin-top: 6px;
        margin-left: 18px;
        margin-bottom: 5px;
    }

}
</style>

