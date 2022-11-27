import { Vue } from 'vue-property-decorator';
import { NxServer } from './../../helpers/services/nx-server';
import { BehaviorSubject } from 'rxjs';

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
    nx_server: new NxServer({ ip: "localhost", port: 7001 })
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
    })
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

/// test data: cameras
$global.cameras$.next({
    "1": "Zone A",
    "2": "Zone B",
    "3": "Zone C",
    "4": "Zone D",
    "5": "Zone E"
});

/// test data: attributes
$global.attributes$.next({
    "1": "Black",
    "2": "White",
    "3": "Gray",
    "4": "Red",
    "5": "Orange",
    "6": "Yellow",
    "7": "Violet",
    "8": "Green",
    "9": "Blue",
    "10": "Brown"
});

/// test data: face & person