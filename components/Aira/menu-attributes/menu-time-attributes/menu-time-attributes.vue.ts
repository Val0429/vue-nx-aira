/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { DateHelper } from '@/../core/utilities/date-helper';

@Component
export class MenuTimeAttributes extends Vue {
    @Model('input', {
        required: false,
    })
    value!: any;

    @Prop({
        required: false,
        default: "Time Period"
    })
    label!: any;

    private getContent(value) {
        if (!value || !value.from || !value.to)  return "";
        let from = new Date(value.from);
        let to = new Date(value.to);
        return DateHelper.format(from, "YYYY/MM/DD HH:mm") + " - " + DateHelper.format(to, "MM/DD HH:mm");
    }
}
export default MenuTimeAttributes;