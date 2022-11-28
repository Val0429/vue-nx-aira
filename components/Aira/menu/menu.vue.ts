/*
 * Created on Tue Nov 22 2022
 * Author: Val Liu
 * Copyright (c) 2022, Aira
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import { toEnumInterface, ObjectHelper } from '@/../core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { first } from 'rxjs/internal/operators/first';

@Component
export class Menu extends Vue {
    filterEnabled: boolean = false;
    att_interface(alter?) {
        return `
        interface {
            /**
             * @uiLabel - Select All
             */
            selectAll?: boolean;
            /**
             * @uiLabel - Attributes
             * @uiHidden - ${this.$form("form_attribute"+(alter?`_${alter}`:""), "selectAll") !== false}
             */
            values?: ${toEnumInterface((this.$observables.attributes$ as any).value, true)}
        };
        `;
    }
    cam_interface(alter?) {
        return `
        interface {
            /**
             * @uiLabel - Select All
             */
            selectAll?: boolean;
            /**
             * @uiLabel - Cameras
             * @uiHidden - ${this.$form("form_camera"+(alter?`_${alter}`:""), "selectAll") !== false}
             */
            values?: ${toEnumInterface((this.$observables.cameras$ as any).value, true)}
        };
        `;
    }
    tp_interface() {
        return `
        interface {
            /**
             * @uiLabel - From
             * @uiType - ivc-form-datetime
             */
            from?: Date;
            /**
             * @uiLabel - To
             * @uiType - ivc-form-datetime
             */
            to?: Date;
        };
        `;
    }

    private form_submit(alter?) {
        (this.$refs["form_timeperiod"+(alter?`_${alter}`:"")] as any).doSubmit();
        (this.$refs["form_camera"+(alter?`_${alter}`:"")] as any).doSubmit();
        (this.$refs["form_attribute"+(alter?`_${alter}`:"")] as any).doSubmit();
    }
}
export default Menu;