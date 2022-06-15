<template>
    <div style="display: flex; justify-content: center; text-align: center; margin-top: -10px; margin-bottom: -10px; height: 40px; position: relative; overflow: hidden; min-width: 50px; max-width: 136px; margin-left: auto; margin-right: auto;">
        <div style="position: absolute; left: 50%; top: -180%; z-index: 0">
            <div style="position: relative; left: -50%; top: 180%">
                <img :src="attrs.value" :title="attrs.row.token_id" style="height: 187px; width: 134px" />
            </div>
        </div>
        <!-- token id -->
        <span style="position: absolute; z-index: 100; color: white; text-shadow: 0 0 0.2em #87F, 0 0 0.2em #87F, 0 0 0.2em #87F; left: 2px; font-size: 12px">#{{attrs.row.token_id}}</span>
        <!-- rank -->
        <span style="position: absolute; z-index: 100; color: white; left: 2px; bottom: 1px; font-size: 10px; background: #FF000099; border-radius:4px; padding: 0 3px;">{{attrs.row.rank}}</span>
        <!-- LR -->
        <a :href="'https://looksrare.org/collections/0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258/' + attrs.row.token_id" target="_blank" @click.stop style="position: absolute; right: 1px; top: -2px">
            <img :src="looksrare_image_url" title="Go Looksrare" style="height: 20px" />
        </a>
        <!-- OS -->
        <a :href="'https://opensea.io/assets/ethereum/0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258/' + attrs.row.token_id" target="_blank" @click.stop style="position: absolute; right: 2px; bottom: 0">
            <img :src="opensea_image_url" title="Go Opensea" style="height: 18px" />
        </a>
    </div>
</template>

<script lang="ts" src="./NFT-item.vue.ts" />
