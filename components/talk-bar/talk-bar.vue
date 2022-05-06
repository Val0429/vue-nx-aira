<template>
<div>
    <div :style=" { display: 'flex', 'justify-content': side === 0 ? 'end' : 'start', 'flex-direction': side === 0 ? 'row' : 'row-reverse', [side === 0 ? 'margin-left' : 'margin-right']: '10px', 'margin-top': '5px' }">
        <!-- date -->
        <div :style="{ 'text-align': side === 0 ? 'right' : 'left', 'align-self': 'flex-end', 'margin-bottom': '10px', 'margin-right': '10px' }">
            <span style="font-weight: bold; font-size: 12px" v-html="getDateText()" />
        </div>
        <!-- message -->
        <div style="align-self: flex-start; background: white; border-radius: 14px; border: 2px solid #DDDDFF; margin-right: 10px; margin-left: 10px; padding: 10px 20px; min-width: 350px; min-height: 76px">
            <span v-html="message" />
        </div>
        <!-- avatar -->
        <div style="position: relative; flex: 0 0 80px; overflow: hidden; text-align: center" v-if="account">
            <div class="neon" style="margin-bottom:-30px; margin-top: 2px; color: darkblue; float: right; overflow: visible; position: relative; z-index: 1000; width: 100%; text-align: center">{{ title }}</div>
            <img :src="account.profile_img_url" style="width: 80px; height: 60px; border-radius: 10px" />
            <div :title="getUsername(account)" style="font-size: 12px; margin: 2px 8px 2px 8px; font-weight: bold; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ getUsername(account) }}1212121</div>
        </div>
    </div>
</div>
</template>


<script lang="ts" src="./talk-bar.vue.ts" />

<style lang="scss" scoped>
.neon {
  color: #fff;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #fff,
    0 0 40px #0ff,
    0 0 80px #0ff,
    0 0 90px #0ff,
    0 0 100px #0ff,
    0 0 150px #0ff;
}
</style>