<template>
    <div key="main">
        <iv-auto-card :label="_('m_SystemConfiguration')">
            <iv-form
                ref="form"
                :interface="inf()"
                :value="value"
                @submit="doSubmit"
                />
        </iv-auto-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';
import { IFormNumberRange } from '@/../components/form/elements/form-number/form-number.vue';
import { GetConfigSFS } from '@/config/default/server';
import AlertResponse from '@/../components/modal/alert-response/alert-response.vue';

@Component
export default class SystemConfiguration extends Vue {
    /// Search Similarity Threshold
    private ssr: IFormNumberRange = { min: 30, max: 99 };
    /// Search Period Minutes
    private spr: IFormNumberRange = { min: 10, max: 120 };
    /// Merge Similarity Score
    private msr: IFormNumberRange = { min: 1, max: 100 };
    /// Pre And Post Video Duration
    private vdr: IFormNumberRange = { min: 5, max: 60 };
    /// Data Retension Days
    private drr: IFormNumberRange = { min: 5, max: 60 };

    private inf() {
        return `
        interface {
            /**
             * @uiType - iv-form-header
             * @uiLabel - ${this._("m_LiveTracking")}
             */
            header1_livetracking?: any;
            /**
             * @uiLabel - ${this._("m_SearchSimilarityThreshold", this.ssr)}
             * @uiType - iv-form-number
             * @uiAttrs - ${JSON.stringify(this.ssr)}
             * @uiValidation - (v) => v >= ${this.ssr.min} && v <= ${this.ssr.max}
             * @uiInvalidMessage - ${this._("m_SearchSimilarityThreshold", this.ssr)}
             */
            searchSimilarityThreshold: number;
            /**
             * @uiLabel - ${this._("m_SearchPeriodMinutes", this.spr)}
             * @uiType - iv-form-number
             * @uiAttrs - ${JSON.stringify(this.spr)}
             * @uiValidation - (v) => v >= ${this.spr.min} && v <= ${this.spr.max}
             * @uiInvalidMessage - ${this._("m_SearchPeriodMinutes", this.spr)}
             */
            searchPeriodMinutes: number;
            /**
             * @uiLabel - ${this._("m_MergeFaceScore", this.msr)}
             * @uiType - iv-form-number
             * @uiAttrs - ${JSON.stringify(this.msr)}
             * @uiValidation - (v) => v >= ${this.msr.min} && v <= ${this.msr.max}
             * @uiInvalidMessage - ${this._("m_MergeFaceScore", this.msr)}
             */
            mergeFaceScore: number;

            /**
             * @uiType - iv-form-header
             * @uiLabel - ${this._("m_SearchResults")}
             */
            header2_searchresults?: any;
            /**
             * @uiLabel - ${this._("m_PreAndPostVideoDuration", this.vdr)}
             * @uiType - iv-form-number
             * @uiAttrs - ${JSON.stringify(this.vdr)}
             * @uiValidation - (v) => v >= ${this.vdr.min} && v <= ${this.vdr.max}
             * @uiInvalidMessage - ${this._("m_PreAndPostVideoDuration", this.vdr)}
             */
            preAndPostVideoDurationSeconds: number;
            /**
             * @uiType - iv-form-header
             * @uiLabel - ${this._("w_Database")}
             */
            header3_database?: any;
            /**
             * @uiLabel - ${this._("m_DataRetensionDays", this.drr)}
             * @uiType - iv-form-number
             * @uiAttrs - ${JSON.stringify(this.drr)}
             * @uiValidation - (v) => v >= ${this.drr.min} && v <= ${this.drr.max}
             * @uiInvalidMessage - ${this._("m_DataRetensionDays", this.drr)}
             */
            dataRetensionDays: number;
        };
        `;
    }

    value: GetConfigSFS.Output = {};
    private mounted(): void {
        this.$server.R("/config/sfs")
            .then(response => {
                this.value = response;
            });
    }

    private async doSubmit(): Promise<void> {
        await this.$server.C("/config/sfs", this.$form("form"));
        new AlertResponse({
            propsData: {
                label: this._("w_Settings"),
                value: this._("m_ConfigSuccessful")
            }
        }).$modal();
    }
}
</script>
