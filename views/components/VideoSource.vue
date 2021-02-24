<template>
    <div key="main">
        <iv-card :label="_('m_VideoSource')">
            <iv-table
                :server="{ path: '/cameras' }"
                :interface="inf()"
                >

                <template #actions="{$attrs}">
                    <iv-toolbox-more>
                        <iv-toolbox-view @click="doView($attrs.row)" />
                        <iv-toolbox-edit @click="doEdit($attrs.row)" />
                    </iv-toolbox-more>
                </template>

            </iv-table>
        </iv-card>
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
