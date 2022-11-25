<template>
    <div class="d-flex content-body flex-column">

    </div>
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

@Component
export default class Investigation extends Vue {
}
</script>
