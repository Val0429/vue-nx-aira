import { EFormQuick, IFormQuick } from '@/../components/form/helpers/form-quick';
import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { toEnumInterface } from '@/../core';

@Component
export class Agnes extends Vue implements IFormQuick {
    path: string = "/agnes";
    tView: string = "_('wb_View')";
    tAdd: string = "_('wb_Add')";
    tPreview: string = "Preview";
    canPreview = false;
    tEdit: string = "Edit";
    inf(type: EFormQuick): string {
        switch (type) {
            case EFormQuick.View:
                return `
                interface {
                    sex: string;
                    service: boolean;
                    serviceType: string;
                    description: string;
                }
                `;
            case EFormQuick.Add:
            case EFormQuick.Edit:
                return `
                interface {
                    sex: ${toEnumInterface({
                        "0": "女",
                        "1": "男"
                    })};
                    service: boolean;
                    serviceType: ${toEnumInterface({
                        "NotYetService": "未服役",
                        "Serviced": "已服役",
                        "AlternativeService": "替代役",
                        "NoNeedService": "免役"
                    })};
                    description: string;
                }
                `;
        }
        return;
    }
    private log() {
        console.log('log', ...arguments);
    }
}
export default Agnes;