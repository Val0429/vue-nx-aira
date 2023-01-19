<template>
    <fragment>
        <ivc-menu />
        <div class="d-flex content-body flex-column">
            <ivc-investigation-row v-for="(o, index) in cameras" :key="index" :idx="index" :value="o" />
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
    overflow-y: auto;
    padding: 15px 0;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Investigation extends Vue {
    private get cameras() {
        let value = this.camera_value$;
        if (!value || value.selectAll === undefined) return [];
        if (value.selectAll == true) return Object.keys(this.cameras$);
        if (!value.values) return [];
        return value.values;
    }
}
</script>
