<template>
    <span style="display: flex; align-items: center; justify-content: center">
        <img :src="eth_image_url" title="WETH" style="height: 20px; margin-right: 6px" />
        {{ toFixedPrice(value, digits || 3) }}
    </span>
</template>

<script lang="ts" src="./crypto-price.vue.ts" />
