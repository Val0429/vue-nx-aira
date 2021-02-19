import { EFormQuick, IFormQuick } from '@/../components/form/helpers/form-quick';
import { Vue, Component, Prop, Model } from "vue-property-decorator";

export class Announcements extends Vue implements IFormQuick {
    /// 1) cgi path
    path: string = "/announcements";

    /// 20) i18n - view / edit / add
    tView: string = "View";
    tAdd: string = "Add";
    tPreview: string = "Preview";
    tEdit: string = "Edit";

    /// 30) possibility - edit / add / delete
    canAdd?: boolean = true;
    canEdit?: boolean = true;
    canPreview?: boolean = true;
    canDelete?: boolean = true;

    /// 40) interfaces - view / edit / add
    inf(type: EFormQuick): string {
        switch (type) {
            case EFormQuick.View:
                return `
                interface {
                    objectId: string;
                    title: string;
                    content: string;
                    createdAt: Date;
                    updatedAt: Date;
                }
                `;
            case EFormQuick.Preview:
                return `
                interface {
                    /**
                     * @uiType - iv-form-label
                     */
                    title: string;
                    /**
                     * @uiType - iv-form-label
                     */
                    content: string;
                }
                `;
            case EFormQuick.Add:
            case EFormQuick.Edit:
                return `
                interface {
                    title: string;
                    content: string;
                }
                `;
        }
    }
}
export default Announcements;
