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
export type IDVEventsCategoryByDate =
    Array<{ time: number, identify: number, unknown: number }>;
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
                let rtn: IDVEventsCategoryByDate = [];
                let middle = ary.reduce((final, value) => {
                    let [time, type] = value;
                    final[time] = (final[time] || {time, identify: 0, unknown: 0});
                    final[time][type]++;
                    return final;
                }, {});

                /// categorize
                Object.keys(middle).forEach(time => {
                    rtn.push(middle[time]);
                });

                /// sort
                rtn.sort((a, b) => a.time - b.time);

                return rtn;
            }
        )
    }
}

export {
    db_events,
    dv_events_chart1_category_by_date
};