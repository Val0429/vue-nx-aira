import { Vue } from 'vue-property-decorator';
import { NxServer } from './../../helpers/services/nx-server';
import { BehaviorSubject } from 'rxjs';
import { db_events, dv_events_chart1_category_by_date, IDVEventsCategoryByDate } from './globals/db';

interface IValue {
    [index: string]: string;
}
interface ITimePeriodValue {
    from: Date;
    to: Date;
}
interface ICameraValue {
    selectAll?: boolean;
    values?: string[];
}
type IAttributeValue = ICameraValue;

export const Global = {
    nx_server: new NxServer({ ip: "localhost", port: 7001 }),
    db_events,
    dv_events_chart1_category_by_date
}

/// timeperiod_value
let now = new Date();
let from = new Date(now);
from.setHours(now.getHours()-12);
let to = now;

export const $global = {
    /// cameras / attributes
    cameras$: new BehaviorSubject<IValue>({}),
    attributes$: new BehaviorSubject<IValue>({}),
    /// selected cameras / attributes / timeperiod
    timeperiod_value$: new BehaviorSubject<ITimePeriodValue>({
        from, to
    }),
    camera_value$: new BehaviorSubject<ICameraValue>({
        selectAll: true
    }),
    attribute_value$: new BehaviorSubject<IAttributeValue>({
        selectAll: true
    }),

    /// charts
    chart1_value$: new BehaviorSubject<IDVEventsCategoryByDate>([]),
}

declare module "vue/types/vue" {
    export interface Vue {
        $global: typeof $global;
    }
}

export const GlobalPlugin = {
    install: function(Vue: any) {
        if (Vue._aira_global_installed) return;
        Vue._aira_global_installed = true;

        Vue.mixin({
            subscriptions: () => {
                return $global;
            }
        });
    }
}
