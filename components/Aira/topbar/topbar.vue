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
    <b-nav class="header" align="center">
        <div class="logo" />

        <b-nav-item to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item to="/investigation">Investigation</b-nav-item>
        <b-nav-item to="/case">Case</b-nav-item>

        <ivc-datetitle class="datetitle" />
    </b-nav>
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
    
    .logo {
        margin: 0;
        position: absolute;
        left: 25px; top: 50%;
        transform: translateY(-50%);
        width: 150px;
        height: 20px;
        background: url("~@/assets/images/aira.svg");
    }

    .datetitle {
        position: absolute;
        right: 25px; top: 50%;
        transform: translateY(-50%);
    }

    li.nav-item {
        padding: 0 45px;
    }
    a.nav-link, li.nav-item > a {
        display: inline-block;
        height: 100%;
        font-size: 22px;
        line-height: $top-height;
        padding: 0 5px;
        color: #B4BFC0 !important;

        &:hover {
            text-decoration: none;
        }
        &.active {
            font-weight: 700;
            color: #43A0D1 !important;
        }
    }
}
</style>

