<template>
    <b-card
        no-body
        :border-variant="data['border-variant']"
    >
        <b-card-header @dblclick="!data['hide-collapse-button'] ? innateVisible=!innateVisible : null" :header-bg-variant="data['header-bg-variant'] || 'iv-card-header'">
            <iv-icon v-if="icon" :variant="data['icon-variant'] || 'light'" :size="data['icon-variant'] || 'lg'" :icon="icon" />

            <div class="title">{{ label }}</div>

            <div class="float-right toolbox">
                <slot name="toolbox" />
                <b-button v-if="!data['hide-collapse-button']" v-b-toggle="'collapse-' + _uid" :variant="data['header-bg-variant'] || 'iv-card-header'" size="lg" class="card-collapse-button fa fa-chevron-down" :class="{ card_close: !innateVisible }" />
            </div>

        </b-card-header>

        <b-collapse
            :visible="innateVisible"
            class="scrollable-collapse"
            @show="innateVisible = true; $emit('update:visible', true);"
            @hide="innateVisible = false; $emit('update:visible', false);"
            :id="'collapse-' + _uid">
            <b-card-body :class="{ 'no-padding': noBodyPadding }">
                <slot />
            </b-card-body>

            <b-card-footer v-if="$slots.footer" :footer-bg-variant="data['footer-bg-variant'] || 'light'" class="footer">
                <slot name="footer-before" />
                <slot name="footer" />
                <slot name="footer-after" />
            </b-card-footer>
        </b-collapse>
    </b-card>
</template>

<script lang="ts" src="./card.vue.ts" />

<style lang="scss" scoped>
.card {
    overflow-y: visible !important;

    > .bg-iv-card-header {
        color: white;
        font-size: 20px;
        display: flex;
        align-items: center;

        > .title {
            color: #B4BFC0;
        }
    }
}
.scrollable-collapse {
    flex: 1 1 0;
    overflow-y: auto;
}

.toolbox {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0.4rem;
    height: 2.2rem;
    top: 0.6rem;
    // top: 0.5rem;

    // transform: scale(1.5);

    > * {
        margin-left: 0.18rem;
        margin-right: 0.18rem;
    }

    .card-collapse-button {
        color: white !important;
        cursor: pointer;
        @include transition(all .2s linear);
        @include rotate(180);
    }

    .card_close {
        @include rotate(0);
        @include transform-origin(50% 50% 0);
    }
}

.no-padding {
    padding: 0 !important;
}

.title {
    display: inline-block;
    margin-left: 6px;
    min-height: .8rem;
}

.footer {
    text-align: right;

    ::v-deep > * {
        margin: 0 .2rem;
    }
}
</style>

