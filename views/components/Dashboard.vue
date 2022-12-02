<template>
    <fragment>
        <ivc-menu />
        <div class="d-flex content-body flex-column">
            <ivc-chart1 class="mt-3 mb-3 overflow-hidden flex-fill-0" @click="chart1_click" />
            <div class="d-none d-lg-flex flex-row flex-fill-0 overflow-hidden">
                <ivc-chart2 class="mt-1 mb-3 flex-fill-0" />
                <ivc-chart3 class="mt-1 mb-3 flex-fill-0" />
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

// import bsopt from "./example/bar-stack";
// import pdopt from "./example/pie-doughnut";
// import pcopt from "./example/pie-custom";

@Component({
    components: { VChart },
    provide: { [THEME_KEY]: "dark" }
})
export default class Dashboard extends Vue {
    // bsoption = bsopt;
    // pdoption = pdopt;
    // pcoption = pcopt;

    private chart1_click(e) {
        if (e.componentType === "series") {
            let from = e.data.time;
            let to = from + 60*60*1000;
            (this.$observables.alt_timeperiod_value$ as any).next({
                from, to
            });
            /// goto
            this.$router.push("/investigation");
        }
    }
}
</script>
