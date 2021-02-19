<template>
    <iv-route-transition>
    <div key="main" style="padding: 5px 10px">

        <div class="row">
            <iv-topic class="col-md-4 mr-2" :label="_('m_SourcesManagement')">
                <iv-topic-item variant="primary" icon="fa-video-camera" :label="_('m_VideoSource')" url="/sources/video-source" />
            </iv-topic>

            <iv-topic class="col-md-4 mr-2" :label="_('m_SettingsManagement')">
                <iv-topic-item variant="secondary" icon="fa-cogs" :label="_('m_SystemConfiguration')" url="/settings/system-configuration" />
            </iv-topic>
        </div>

    </div>
    </iv-route-transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class License extends Vue {
}
</script>
