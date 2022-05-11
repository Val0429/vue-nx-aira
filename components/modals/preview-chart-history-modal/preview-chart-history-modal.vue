<template>
    <iv-modal
        :visible.sync="visible"
        label="交易紀錄"
        @update:visible="doUpdateVisible"
    >
        <div class="wrapper" v-if="!history">
            <img src="@/assets/images/giphy.gif" />
        </div>
        <div v-else class="content">
            <!-- 寶物資訊 -->
            <iv-card :label="getItemInfoTextShort()" :visible="false">
                <div style="display: flex; margin: auto; border-radius: 20px; border: 1px solid black; width: 450px; height: 278px; overflow: hidden; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.8);">
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 5; background: #232A70">
                        <img :src="history.item.image_url" style="margin: 15px; width: 200px; border-radius: 20px" />
                    </div>
                    <div style="display: flex; flex: 4; box-sizing: border-box; background: #262E76; color: white;">
                        <div style="align-self: center; margin-left: 25px;">
                            編號:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#{{ history.item.token_id }}<BR/>
                            稀有度:&nbsp;&nbsp;&nbsp;{{ history.item.rank }} / {{ history.item.total }}
                        </div>
                    </div>
                </div>
            </iv-card>

            <!-- 買賣家資產 -->
            <iv-card :label="getAssetInfoTextShort()" v-if="history && history.seller_assets" :visible="false">
                <!-- 賣家宣言 -->
                <ivc-talk-bar
                    title="賣家"
                    :message="getSellerAssetInfoText(history)"
                    :account="((history||{}).seller_info||{}).account"
                    :date="new Date()"
                    />
                <!-- 買家宣言 -->
                <ivc-talk-bar
                    title="買家"
                    :side="1"
                    :message="getBuyerAssetInfoText(history)"
                    :account="((history||{}).buyer_info||{}).account"
                    :date="new Date()"
                    />
            </iv-card>

            <!-- 買賣雙方資訊與成交 -->
            <iv-card :label="getBoughtInfoTextShort()">
                <!-- 賣家宣言 - 買入時間 -->
                <ivc-talk-bar
                    v-if="history"
                    title="賣家"
                    :message="getSellerBoughtInfoText(history.seller_info)"
                    :account="((history||{}).seller_info||{}).account"
                    :date="history.seller_info.bought_price.date ? new Date(history.seller_info.bought_price.date): null"
                    />
                <!-- 賣家宣言 - 想要賣出時間 -->
                <ivc-talk-bar
                    v-if="history"
                    title="賣家"
                    :message="getSellerWantingInfoText(history.seller_info)"
                    :floor="history.seller_info.wanting_price.floor"
                    :account="((history||{}).seller_info||{}).account"
                    :date="history.seller_info.wanting_price.date ? new Date(history.seller_info.wanting_price.date): null"
                    />
                <!-- 買家宣言 -->
                <ivc-talk-bar
                    v-if="history"
                    title="買家"
                    :side="1"
                    :floor="history.buyer_info.bought_price.floor"
                    :message="getBuyerInfoText(history)"
                    :account="((history||{}).buyer_info||{}).account"
                    :date="((history||{}).buyer_info||{}).bought_price.date ? new Date(((history||{}).buyer_info||{}).bought_price.date) : null"
                    />
                <!-- 賣家成交 -->
                <ivc-talk-bar
                    v-if="history"
                    title="賣家"
                    :floor="history.buyer_info.bought_price.floor"
                    :message="getSellerDealText(history)"
                    :account="((history||{}).seller_info||{}).account"
                    :date="((history||{}).buyer_info||{}).bought_price.date ? new Date(((history||{}).buyer_info||{}).bought_price.date) : null"
                    />
            </iv-card>

            <!-- 買家後續發展 -->
            <iv-card label="買家後續發展">
                <ivc-talk-bar
                    v-for="(item, index) in history.events"
                    :side="1"
                    :key="index"
                    title="買家"
                    :floor="item.floor"
                    :message="getAdvancedMessage(item, index, history.events)"
                    :account="((history||{}).buyer_info||{}).account"
                    :date="new Date(item.created_date)"
                    />
            </iv-card>
        </div>
    </iv-modal>
</template>


<script lang="ts" src="./preview-chart-history-modal.vue.ts" />

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 600px;
    margin: 50px 10px;
}

.content {
    min-width: 800px;
    margin-bottom: 30px;
}

.glow {
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}

.emp {
    font-weight: bold;
    color: purple;
}

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
