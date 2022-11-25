/*
 * Created on Tue Nov 22 2022
 * Author: Val Liu
 * Copyright (c) 2022, Aira
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import { toEnumInterface } from '@/../core';

@Component
export class Menu extends Vue {
    filterEnabled: boolean = false;
    att_interface() {
        return `
        interface {
            /**
             * @uiLabel - Select All
             * @uiDefault - () => true
             */
            selectAll?: boolean;
            /**
             * @uiLabel - Attributes
             * @uiHidden - ${this.$form("form_att", "selectAll") === true}
             */
            cameras?: ${toEnumInterface({
                "1": "Red", "2": "Green", "3": "Blue"
            }, true)}
        };
        `;
    }
    cam_interface() {
        return `
        interface {
            /**
             * @uiLabel - Select All
             * @uiDefault - () => true
             */
            selectAll?: boolean;
            /**
             * @uiLabel - Cameras
             * @uiHidden - ${this.$form("form_cam", "selectAll") === true}
             */
            cameras?: ${toEnumInterface({
                "1": "Zone 1", "2": "Zone 2", "3": "Zone 3"
            }, true)}
        };
        `;
    }
    tp_interface() {
        let now = new Date();
        let from = new Date(now);
        from.setHours(now.getHours()-12);
        let to = now;
        return `
        interface {
            /**
             * @uiLabel - From
             * @uiDefault - ${from}
             */
            from?: Date;
            /**
             * @uiLabel - To
             * @uiDefault - ${now}
             */
            to?: Date;
        };
        `;
    }
}
export default Menu;