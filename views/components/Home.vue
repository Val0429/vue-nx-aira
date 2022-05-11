<template>
    <div key="main" style="padding: 5px 10px">

        <div class="row">
            <div class="col-md-6">
                <iv-topic label="NFT歷史資料">
                    <iv-topic-item variant="primary" url="/chart" />
                </iv-topic>
            </div>
<!-- 
            <div class="col-md-6">
                <iv-topic :label="_('m_LogsManagement')">
                    <iv-topic-item variant="primary" url="/logs" />
                </iv-topic>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-12">
                <iv-topic :label="_('m_SettingsManagement')">
                    <iv-topic-item variant="secondary" url="/settings/license" />
                    <iv-topic-item variant="secondary" url="/settings/vast2-configuration" />
                    <iv-topic-item variant="secondary" url="/settings/system-configuration" />
                </iv-topic>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Home extends Vue {
}
</script>
