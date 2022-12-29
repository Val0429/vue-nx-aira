<template>
    <div class="investigation-row-container">
        <!-- <div class="image" :class="{[tmp_image_count]: true}" /> -->

        <ivc-chart11 class="mt-3 mb-3 overflow-hidden flex-fill-0" />
    </div>
</template>

<style lang="scss" scoped>
.investigation-row-container {
    height: 160px;
    margin: 10px 40px;

    .image {
        width: 256px;
        height: 144px;
        background: no-repeat center center;
        background-size: 100% 100%;

        &.image1 { background-image: url("~@/assets/images/snapshot1.png"); }
        &.image2 { background-image: url("~@/assets/images/snapshot2.png"); }
        &.image3 { background-image: url("~@/assets/images/snapshot3.png"); }
        &.image4 { background-image: url("~@/assets/images/snapshot4.png"); }
        &.image5 { background-image: url("~@/assets/images/snapshot5.png"); }
    }
}
</style>

<script lang="ts" src="./investigation-row.vue.ts" />
