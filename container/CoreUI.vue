<template>
    <CoreUIBase>
        <template #header>
            <div class="custom-header">
                <span style="font-size: 18px; font-weight: bold; position: absolute; left: 10px; top: 12px">Smart Face Tracker</span>
                <iv-language-button class="language-btn" />
            </div>
        </template>

        <template #logo>
          <img class="navbar-brand-full" src="/public/logo.png" width="89" height="25" alt="Logo">
        </template>

        <template #footer>
            <div style="flex: 1">
            <span class="version">
                <span>Server Version: v{{ $info.server.version }}</span>
                <span>Web Version: v{{ $info.web.version }}</span>
            </span>
            {{ $info.server.copyright }}
            </div>
        </template>

        <template #nav>
            <SidebarNav>

                <SidebarNavItem url="/nftautotools" />
                <SidebarNavItem url="/nfttools" />
                <SidebarNavItem url="/chart" />
                <SidebarNavItem url="/saleanalyze" />
                <SidebarNavItem url="/looksrare" />
                <SidebarNavItem url="/otherdeedanalyze" />
                <SidebarNavItem url="/otherdeedresourcefilter" />

                <!-- <SidebarNavItem url="/sources/video-source" /> -->

                <!-- <SidebarNavItem url="/settings">
                    <SidebarNavItem url="/settings/license" />
                    <SidebarNavItem url="/settings/vast2-configuration" />
                    <SidebarNavItem url="/settings/system-configuration" />
                </SidebarNavItem>

                <SidebarNavItem url="/logs" /> -->

                <!-- <SidebarNavItem url="/components">
                    <SidebarNavItem url="/components/buttons" />
                    <SidebarNavItem url="/components/forms" />
                    <SidebarNavItem url="/components/step-progress" />
                    <SidebarNavItem url="/components/tab" />
                    <SidebarNavItem url="/components/toolbox" />
                    <SidebarNavItem url="/components/cards" />
                    <SidebarNavItem url="/components/cards/auto" />
                    <SidebarNavItem url="/components/table" />
                    <SidebarNavItem url="/components/tree" />
                    <SidebarNavItem url="/components/transition" />
                    <SidebarNavItem url="/components/modal" />
                    <SidebarNavItem url="/components/utilities" />
                </SidebarNavItem>
                <SidebarNavItem url="/reusable-theme" />

                <SidebarNavTitle label="選單特殊樣式" />
                <SidebarNavItem url="/menu-style/1" />
                <SidebarNavItem url="/menu-style/2" /> -->

            </SidebarNav>

        </template>
    </CoreUIBase>
</template>

<style lang="scss" scoped>
.custom-header {
    position: relative;

    &:after {
        content: '';
        display: block;
        clear: both;
    }

    > .language-btn {
        float: right;
        margin-right: 30px !important;
        z-index: 1000;
    }
}

.version {
    float: right;
    margin-right: 270px;
    cursor: default;

    > span {
        background: #EEE;
        padding: 0 10px;
        border-radius: 5px;
        border: 1px solid #DDD;
    }

    > span:not(:last-child) {
        margin-right: 20px;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterTheme } from '@/../core/theme';
import { CoreUI as CoreUIBase,
    SidebarHeader, SidebarNav, SidebarNavTitle, SidebarNavDivider, SidebarNavItem
} from '@/../containers/CoreUI';
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