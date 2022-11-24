<template>
  <!-- <b-navbar class="header justify-content-center" toggleable="lg">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <div class="logo" />

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="justify-content-center">
                <b-nav-item to="/dashboard">Dashboard</b-nav-item>
                <b-nav-item to="/investigation">Investigation</b-nav-item>
            </b-navbar-nav>
        </b-collapse>

        <ivc-datetitle class="datetitle" />
  </b-navbar> -->
    <div class="header justify-content-center">
        <div class="logoarea d-flex flex-row align-items-center">
            <!-- <iv-button class="b-icon-show-menu" icon="v-icon-show-menu" variant="dark" @click="filterEnabled=!filterEnabled" /> -->
            <button class="navbar-toggler flex-fill mr-2 d-block d-lg-none" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon v-icon-show-menu"></span>
            </button>
            <div class="logo" />
        </div>

        <div class="navs d-none d-lg-block">
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/investigation">Investigation</router-link>
            <router-link to="/case">Case</router-link>
        </div>

        <ivc-datetitle class="datetitle" />
    </div>
</template>

<script lang="ts" src="./topbar.vue.ts" />

<style lang="scss" scoped>
.header {
    position: relative;
    height: $top-height;
    text-align: center;
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

    .navs > a {
        display: inline-block;
        height: 100%;
        font-size: 22px;
        line-height: $top-height;
        padding: 0 45px;
        color: #B4BFC0 !important;

        &:hover {
            text-decoration: none;
        }
        &.active {
            font-weight: 700;
            color: #43A0D1 !important;
        }
    }

    // li.nav-item {
    //     padding: 0 45px;
    // }
    // a.nav-link, li.nav-item > a {
    //     display: inline-block;
    //     height: 100%;
    //     font-size: 22px;
    //     line-height: $top-height;
    //     padding: 0 5px;
    //     color: #B4BFC0 !important;

    //     &:hover {
    //         text-decoration: none;
    //     }
    //     &.active {
    //         font-weight: 700;
    //         color: #43A0D1 !important;
    //     }
    // }
}
</style>

