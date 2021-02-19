import { EFormQuick, IFormQuick } from '@/../components/form/helpers/form-quick';
import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { toEnumInterface } from '@/../core';

@Component
export class ServiceForm extends Vue implements IFormQuick {
    path: string = "/jeff";
    tView: string = "_('wb_View')";
    tAdd: string = "_('wb_Add')";
    tPreview?: string = "_('w_Preview')";
    tEdit?: string = "_('wb_Edit')";
    canAdd?: boolean = true;
    canPreview?: boolean = true;
    canEdit?: boolean = true;
    canDelete?: boolean = true;
    
    inf(type: EFormQuick): string {
        switch (type) {
            case EFormQuick.View:
                return `
                interface {
                    /**
                     * @uiConverter - (value) => value == 0 ? "女" : "男"
                     */
                    sex: any;

                    millitaryService: string;
                    millitaryType: string;

                    createdAt: Date;
                    updatedAt: Date;
                }
                `;
            case EFormQuick.Add:
            case EFormQuick.Preview:
            case EFormQuick.Edit:
                return `
                interface {
                    sex: ${toEnumInterface({
                        0: "女",
                        1: "男"
                    })};

                    /**
                     * @uiLabel - ${this._("wb_Add")}
                     * @uiHidden - ${this.$form("quick", "sex") == 1 ? false : true}
                     */
                    millitaryService: ${toEnumInterface({
                        0: "已服役",
                        1: "替代役",
                        2: "未服役",
                        3: "免役"
                    })};

                    /**
                     * @uiLabel - ${this._("wb_Add")}
                     * @uiHidden - ${this.$form("quick", "sex") == 1 ? false : true}
                     */
                    millitaryType: ${toEnumInterface({
                        0: "陸軍",
                        1: "海軍",
                        2: "空軍"
                    })};
                }
                `;
        }


    }

    // preAdd() {
    //     return {
    //         title: "Default title"
    //     }
    // }
    // postAdd(row: any) {
    //     row.service = "-";
    //     row.serviceType = "-";
    //     row.description = "-";
    //     return row;
    // }
    // prePreview?(row: any) {
    //     throw new Error("Method not implemented.");
    // }
    // preEdit?(row: any) {
    //     throw new Error("Method not implemented.");
    // }
    // postEdit?(row: any) {
    //     throw new Error("Method not implemented.");
    // }

    private log() {
        console.log('???');
        console.log(...arguments);
    }
}
export default ServiceForm;