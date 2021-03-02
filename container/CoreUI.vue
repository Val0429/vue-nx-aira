<template>
    <CoreUIBase>
        <template #header>
            <div class="custom-header">
                <span style="font-size: 18px; font-weight: bold; position: absolute; left: 10px; top: 12px">Smart Face Tracker</span>
                <iv-language-button style="float: right; z-index: 1000" />
            </div>
        </template>

        <template #footer>
            <div style="flex: 1">
            <span class="version">
                <span>Server Version: v{{ serverVersion }}</span>
                <span>Web Version: v{{ webVersion }}</span>
            </span>
            copyright © iSAP Solution 2021
            </div>
        </template>

        <template #nav>
            <SidebarNav>

                <SidebarNavItem url="/sources/video-source" />

                <SidebarNavItem url="/settings">
                    <SidebarNavItem url="/settings/license" />
                    <SidebarNavItem url="/settings/vast2-configuration" />
                    <SidebarNavItem url="/settings/system-configuration" />
                </SidebarNavItem>

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
import { WebVersion } from '@/../core/server';
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
    private serverVersion: string = "";
    private webVersion: string = WebVersion;
    private mounted() {
        this.$server.R("/apis")
            .then(response => {
                this.serverVersion = response.serverVersion;
            });
    }
}
</script>