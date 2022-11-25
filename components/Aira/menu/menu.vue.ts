/*
 * Created on Tue Nov 22 2022
 * Author: Val Liu
 * Copyright (c) 2022, Aira
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import { toEnumInterface } from '@/../core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component
export class Menu extends Vue {
    created() {
        this.bindValues();        
    }

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

    static gsj_ftp_value: BehaviorSubject<any> = new BehaviorSubject({});
    static gsj_fcam_value: BehaviorSubject<any> = new BehaviorSubject({});
    static gsj_fatt_value: BehaviorSubject<any> = new BehaviorSubject({});

    ftp_value = {};
    fcam_value = {};
    fatt_value = {};

    form_submit() {
        let ftp = this.$form("form_tp");
        let fcam = this.$form("form_cam");
        let fatt = this.$form("form_att");

        this.syncValues(ftp, fcam, fatt);
    }
    subscriptions: any[] = [];
    private bindValues() {
        if (this.subscriptions.length !== 0) return;
        this.subscriptions.push( Menu.gsj_ftp_value.subscribe(value => this.ftp_value = value) );
        this.subscriptions.push( Menu.gsj_fcam_value.subscribe(value => this.fcam_value = value) );
        this.subscriptions.push( Menu.gsj_fatt_value.subscribe(value => this.fatt_value = value) );
    }
    private unbindValues() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions.length = 0;
    }
    private syncValues(ftp, fcam, fatt) {
        Menu.gsj_ftp_value.next(ftp);
        Menu.gsj_fcam_value.next(fcam);
        Menu.gsj_fatt_value.next(fatt);
    }
}
export default Menu;