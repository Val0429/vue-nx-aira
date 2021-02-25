<template>
    <div key="main">
        <ivc-cameras />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class VideoSource extends Vue {
    private inf() {
        return `
        interface {
            /**
             * @uiType - iv-cell-auto-index
             * @uiLabel - ${this._("w_No_")}
             */
            autoIndex: any;

            /**
             * @uiLabel - ${this._("w_Key")}
             */
            uniqueIdentity: string;
            /**
             * @uiLabel - ${this._("w_RefName")}
             */
            refName: string;

            config: interface {
                /**
                 * @uiLabel - ${this._("m_MinFaceLength")}
                 */
                minFaceLength: number;
                /**
                 * @uiLabel - ${this._("m_MergeFaceSeconds")}
                 */
                mergeFaceSeconds: number;
            };

            actions: any;
        }
        `;
    }

    private doView() {
    }

    

}
</script>
