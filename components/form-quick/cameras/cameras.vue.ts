import { EFormQuick, IFormQuick } from '@/../components/form/helpers/form-quick';
import { Vue, Component, Prop, Model } from "vue-property-decorator";

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
    canPreview?: boolean = true;
    canDelete?: boolean = false;

    /// 40) interfaces - view / edit / add
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
                        /**
                         * @uiLabel - ${this._("w_Enabled")}
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
                     * @uiLabel - ${this._("w_Key")}
                     * @uiType - iv-form-label
                     */
                    uniqueIdentity: string;
                    /**
                     * @uiLabel - ${this._("w_RefName")}
                     * @uiType - iv-form-label
                     */
                    refName: string;
        
                    config: interface {
                        /**
                         * @uiLabel - ${this._("m_MinFaceLength")}
                         * @uiType - ${type === EFormQuick.Preview ? 'iv-form-label' : 'default'}
                         */
                        minFaceLength: number;
                        /**
                         * @uiLabel - ${this._("m_MergeFaceSeconds")}
                         * @uiType - ${type === EFormQuick.Preview ? 'iv-form-label' : 'default'}
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
}
export default Cameras;
