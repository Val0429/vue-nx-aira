<template>
    <div class="app theme-airablack" id="app">
        <ivc-topbar />
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
#app {
    background: url("~@/assets/images/background.png") #354041 right bottom no-repeat;
    height: 100vh;
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
}
</script>