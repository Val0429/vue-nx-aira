<template>
    <div class="app" id="app">
        <div class="header">
            <div class="logo" />
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/investigation">Investigation</router-link>
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
            background: url("~@/assets/images/aira.png");
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
}
</style>

<script src="./index.vue.ts"></script>
