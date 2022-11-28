<template>
    <fragment>
        <ivc-menu />
        <div class="d-flex content-body flex-column">
            <ivc-chart1 class="mt-3 mb-3 overflow-hidden flex-fill-0" />
            <div class="d-none d-lg-flex flex-row flex-fill-0 overflow-hidden">
                <v-chart ref="chart2" class="mt-1 mb-3" style="flex: 1" :option="pdoption" />
                <v-chart ref="chart3" class="mt-1 mb-3" style="flex: 1" :option="pcoption" />
            </div>
        </div>
    </fragment>        
</template>

<style lang="scss" scoped>
.flex-fill-0 {
    flex: 1 1 0;
}

.content-body {
    border-top: 1px solid #8A9192;
    width: 100vw;
    height: calc(100vh - 67px - 60px);
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

    isReloadReady = false;
    mounted() {
        if (!this.isReloadReady) {
            this.$nextTick(() => {
                this.isReloadReady = true;
                let charts = [
                    this.$refs["chart2"],
                    this.$refs["chart3"]
                ];
                window.addEventListener("resize", () => {
                    charts.forEach(o => (o as any).resize());
                });
            });
        }
    }
}
</script>
