<template>
    <fragment>
        <!-- header -->
        <div class="content-header">
            <!-- filter -->
            <iv-button icon="fa-filter" variant="primary" />
        </div>

        <!-- body -->
        <div class="d-flex content-body" style="flex-direction: column">
            <v-chart class="mt-3 mb-3" style="flex: 1" :option="bsoption" />
            <div class="d-flex" style="flex: 1; flex-direction: row">
                <v-chart class="mt-1 mb-3" style="flex: 1" :option="pdoption" />
                <v-chart class="mt-1 mb-3" style="flex: 1" :option="pcoption" />
            </div>
        </div>
    </fragment>        
</template>

<style lang="scss" scoped>
.content-header {
    border-top: 1px solid #8A9192;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    height: 67px;

    .btn-filter-on {
        color: #fff;
        @include button-ghost-variant(#007bff);
    }
    /deep/ {
        .v-icon-filter {
            width: 32px;
            height: 32px;
            background: url("~@/assets/images/filter_off.png");
        }
    }
}
.content-body {
    border-top: 1px solid #8A9192;
    height: calc(100vh - 67px - 60px);

    // > .bar-stack {
    //     margin: 20px 0;
    //     height: 440px;
    // }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';
import VChart, { THEME_KEY } from "vue-echarts";

import bsopt from "./example/bar-stack";
import pdopt from "./example/pie-doughnut";
import pcopt from "./example/pie-custom";

@Component({
    components: { VChart },
    provide: { [THEME_KEY]: "dark" }
})
export default class Dashboard extends Vue {
    bsoption = bsopt;
    pdoption = pdopt;
    pcoption = pcopt;

}
</script>
