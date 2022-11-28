import * as loki from 'lokijs';

const db = new loki("airaai.db");

export interface IDBEvents {
    time: number;
    camera: string;
    type: "nx.base.Person" | "nx.base.Face";
    position: { x0: number, y0: number, x1: number, y1: number };
    color: string;
    name: string;
}
const db_events = db.addCollection("events", { indices: [] });

/// chart1 data
export interface IDVEventsCategoryByDate {
    identify: Array<[number /*timestamp*/, number/*value*/]>;
    unknown: Array<[number /*timestamp*/, number/*value*/]>;
}
enum EChart1Type { Identify = "identify", Unknown = "unknown" };
type IDBChart1Map = [number/*time*/, EChart1Type];
const dv_events_chart1_category_by_date = {
    data: (): IDVEventsCategoryByDate => {
        return db_events.mapReduce(
            (value: IDBEvents): IDBChart1Map => {
                const oneHour = 60*60*1000;
                let time = value.time - (value.time % oneHour);
                let isIdentify = value.name != undefined;
                return [time, isIdentify ? EChart1Type.Identify : EChart1Type.Unknown];

            }, (ary: IDBChart1Map[]): IDVEventsCategoryByDate => {
                let rtn: IDVEventsCategoryByDate = { identify: [], unknown: [] };
                let middle = ary.reduce((final, value) => {
                    let [time, type] = value;
                    final[type][time] = (final[type][time] || 0)+1;
                    return final;
                }, { identify: {}, unknown: {} });

                /// categorize
                Object.keys(middle.identify).forEach(time => {
                    let value = middle.identify[time];
                    rtn.identify.push([parseInt(time, 10), value]);
                });
                Object.keys(middle.unknown).forEach(time => {
                    let value = middle.unknown[time];
                    rtn.unknown.push([parseInt(time, 10), value]);
                });

                /// sort
                rtn.identify.sort((a, b) => a[0] - b[0]);
                rtn.unknown.sort((a, b) => a[0] - b[0]);

                return rtn;
            }
        )
    }
}

export {
    db_events,
    dv_events_chart1_category_by_date
};