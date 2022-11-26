/*
 * Created on Tue Nov 22 2022
 * Author: Val Liu
 * Copyright (c) 2022, Aira
 */

import { Vue, Component, Prop, Model, Emit, Watch } from "vue-property-decorator";
import { DateHelper } from '@/../core/utilities/date-helper';

@Component
export class DateTitle extends Vue {
    private interval: number;
    date: Date = new Date();

    created() {
        this.interval = setInterval(() => {
            this.date = new Date();
        }, 100);
    }

    private getDateString() {
        return DateHelper.format(this.date, "YYYY/MM/DD");
    }
    private getTimeString() {
        return DateHelper.format(this.date, "HH:mm:ss A");
    }
}

export default DateTitle;