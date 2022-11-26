import { NxServer } from './services/nx-server';
import { BehaviorSubject } from 'rxjs';

interface IValue {
    [index: string]: string;
}

interface ITimePeriodValue {
    from: Date;
    to: Date;
}
interface ICameraValue {
    selectAll: boolean;
    values: string[];
}
type IAttributeValue = ICameraValue;


export const Global = {
    nx_server: new NxServer({ ip: "localhost", port: 7001 }),

    /// cameras / attributes
    cameras: new BehaviorSubject<IValue>({}),
    attributes: new BehaviorSubject<IValue>({}),

    /// selected cameras / attributes / timeperiod
    timeperiod_value: new BehaviorSubject<ITimePeriodValue>({} as any),
    camera_value: new BehaviorSubject<ICameraValue>({} as any),
    attribute_value: new BehaviorSubject<IAttributeValue>({} as any)
}

Global.cameras.next({
    "1": "Zone A",
    "2": "Zone B",
    "3": "Zone C",
    "4": "Zone D",
    "5": "Zone E"
});

Global.attributes.next({
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
