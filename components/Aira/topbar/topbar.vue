<template>
    <div class="header">
        <div class="logo" />
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/investigation">Investigation</router-link>
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

    > a {
        display: inline-block;
        height: 100%;
        font-size: 22px;
        line-height: $top-height;
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
</style>

