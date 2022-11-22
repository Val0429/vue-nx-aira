/*
 * Created on Tue Nov 22 2022
 * Author: Val Liu
 * Copyright (c) 2022, Aira
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";

@Component
export class Menu extends Vue {
    filterEnabled: boolean = false;

    tp_interface() {
        return `
        interface {
            /**
             * @uiLabel - From
             */
            from?: Date;
            /**
             * @uiLabel - To
             */
            to?: Date;
        };
        `;
    }
}
export default Menu;