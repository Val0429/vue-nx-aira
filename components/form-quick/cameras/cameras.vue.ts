import { EFormQuick, IFormQuick } from '@/../components/form/helpers/form-quick';
import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { IFormNumberRange } from '@/../components/form/elements/form-number/form-number.vue';

@Component
export class Cameras extends Vue implements IFormQuick {
    /// 1) cgi path
    path: string = "/cameras";

    /// 20) i18n - view / edit / add
    tView: string = "_('w_View')";
    tAdd: string = "_('w_Add')";
    tPreview: string = "_('w_Preview')";
    tEdit: string = "_('w_Edit')";

    /// 30) possibility - edit / add / delete
    canAdd?: boolean = false;
    canEdit?: boolean = true;
    canPreview?: boolean = false;
    canDelete?: boolean = false;

    /// 40) interfaces - view / edit / add
    /// Min Face Length
    private mflr: IFormNumberRange = { min: 0, max: 500 };
    /// Merge Face Seconds
    private mfsr: IFormNumberRange = { min: 0, max: 30 };
    inf(type: EFormQuick): string {
        switch (type) {
            case EFormQuick.View:
                return `
                interface {
                    /**
                     * @uiType - iv-cell-auto-index
                     * @uiLabel - ${this._("w_No_")}
                     */
                    autoIndex: any;
        
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
                        /**
                         * @uiLabel - ${this._("w_Enabled")}
                         * @uiType - iv-cell-switch
                         */
                        enable: boolean;
                    };
                }
                `;
            case EFormQuick.Preview:
            case EFormQuick.Edit:
                return `
                interface {
                    /**
                     * @uiLabel - ${this._("w_RefName")}
                     * @uiType - iv-form-label
                     */
                    refName: string;
        
                    config: interface {
                        /**
                         * @uiLabel - ${this._("m_MinFaceLengthRange", this.mflr)}
                         * @uiType - ${type === EFormQuick.Preview ? 'iv-form-label' : 'default'}
                         * @uiAttrs - ${JSON.stringify(this.mflr)}
                         * @uiValidation - (v) => v >= ${this.mflr.min} && v <= ${this.mflr.max}
                         * @uiInvalidMessage - ${this._("m_MinFaceLengthRange", this.mflr)}
                         */
                        minFaceLength: number;
                        /**
                         * @uiLabel - ${this._("m_MergeFaceSecondsRange", this.mfsr)}
                         * @uiType - ${type === EFormQuick.Preview ? 'iv-form-label' : 'default'}
                         * @uiAttrs - ${JSON.stringify(this.mfsr)}
                         * @uiValidation - (v) => v >= ${this.mfsr.min} && v <= ${this.mfsr.max}
                         * @uiInvalidMessage - ${this._("m_MergeFaceSecondsRange", this.mfsr)}
                         */
                        mergeFaceSeconds: number;

                        /**
                         * @uiLabel - ${this._("w_Enabled")}
                         * @uiDisabled - ${type === EFormQuick.Preview ? 'true' : 'false'}
                         * @uiType - iv-form-switch
                         */
                        enable: boolean;
                    };
                }
                `;
        }
    }

    async doSwitchChanged(value, attrs) {
        let objectId = attrs.row.objectId;
        let config = attrs.row.config;
        try {
            await this.$server.U("/cameras", {
                objectId,
                config: {
                    ...config,
                    enable: value
                }
            });
        } catch(e) {
            (this.$refs.quick as any).reload();
        }
    }
}
export default Cameras;
