<template>
    <iv-route-transition>
    <div key="main" style="padding: 5px 10px">

        <div class="row">
            <div class="col-md-4">
                <iv-topic :label="_('m_SourcesManagement')">
                    <iv-topic-item variant="primary" url="/sources/video-source" />
                </iv-topic>
            </div>

            <div class="col-md-8">
                <iv-topic :label="_('m_SettingsManagement')">
                    <iv-topic-item variant="secondary" url="/settings/license" />
                    <iv-topic-item variant="secondary" url="/settings/system-configuration" />
                </iv-topic>
            </div>
        </div>

    </div>
    </iv-route-transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Home extends Vue {
}
</script>
