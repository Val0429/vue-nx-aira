/*
 * Created on Tue Nov 22 2022
 * Author: Val Liu
 * Copyright (c) 2022, Aira
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import { toEnumInterface, ObjectHelper } from '@/../core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Global } from '@/helpers';
import { first } from 'rxjs/internal/operators/first';

@Component
export class Menu extends Vue {
    private cam_values = {};
    private att_values = {};

    private form_tp$ = new Subject();
    private form_cam$ = new Subject();
    private form_att$ = new Subject();
    created() {
        this.bindValues();

        Global.cameras.subscribe(o => this.cam_values = o);
        Global.attributes.subscribe(o => this.att_values = o);

        Promise.all([
            this.form_tp$.pipe(first()).toPromise(),
            this.form_cam$.pipe(first()).toPromise(),
            this.form_att$.pipe(first()).toPromise()
        ]).then(() => this.form_submit());
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
            values?: ${toEnumInterface(this.att_values, true)}
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
            values?: ${toEnumInterface(this.cam_values, true)}
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
             * @uiType - ivc-form-datetime
             */
            from?: Date;
            /**
             * @uiLabel - To
             * @uiDefault - ${now}
             * @uiType - ivc-form-datetime
             */
            to?: Date;
        };
        `;
    }

    ftp_value = {};
    fcam_value = {};
    fatt_value = {};

    form_submit() {
        let ftp = this.$form("form_tp");
        let fcam = this.$form("form_cam");
        let fatt = this.$form("form_att");

        if (ObjectHelper.ObjectVueEmpty([ftp, fcam, fatt])) {
            console.log("vue object empty", JSON.stringify(ftp), JSON.stringify(fcam), JSON.stringify(fatt));
            setTimeout(() => this.form_submit(), 0);
        }
        else this.syncValues(ftp, fcam, fatt);
        // this.syncValues(ftp, fcam, fatt);
    }
    subscriptions: any[] = [];
    private bindValues() {
        if (this.subscriptions.length !== 0) return;
        this.subscriptions.push( Global.timeperiod_value.subscribe(value => this.ftp_value = value) );
        this.subscriptions.push( Global.camera_value.subscribe(value => this.fcam_value = value) );
        this.subscriptions.push( Global.attribute_value.subscribe(value => this.fatt_value = value) );
    }
    private unbindValues() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions.length = 0;
    }
    private syncValues(ftp, fcam, fatt) {
        Global.timeperiod_value.next(ftp);
        Global.camera_value.next(fcam);
        Global.attribute_value.next(fatt);
    }
}
export default Menu;