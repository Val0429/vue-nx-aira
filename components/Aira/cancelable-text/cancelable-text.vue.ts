/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit } from "vue-property-decorator";
import { DateHelper } from '@/../core/utilities/date-helper';

@Component
export class CancelableText extends Vue {
    @Model('input')
    value: { from: number, to: number };

    @Emit('cancel')
    private cancel_clicked() {
        console.log("!!!");
        return this;
    }

    private getContent(value) {
        if (!value || !value.from || !value.to)  return "";
        let from = new Date(value.from);
        let to = new Date(value.to);
        return DateHelper.format(from, "YYYY/MM/DD HH:mm") + " - " + DateHelper.format(to, "HH:mm");
    }
}
export default CancelableText;