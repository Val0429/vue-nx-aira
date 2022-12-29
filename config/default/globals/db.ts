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

/* chart1 data -- by date */
export type IDVEventsCategoryByDate =
    Array<{ time: number, Identify: number, Unknown: number }>;
enum EChart1Type { Identify = "Identify", Unknown = "Unknown" };
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
                    final[time] = (final[time] || {time, Identify: 0, Unknown: 0});
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
        );
    }
}

/* chart2 data -- by color */
export type IDVEventsCategoryByColor =
    Array<{ name: string, value: number }>;
type IDBChart2Map = string/*color*/;
const dv_events_chart2_category_by_color = {
    data: (): IDVEventsCategoryByColor => {
        return db_events.mapReduce(
            (value: IDBEvents): IDBChart2Map => {
                return value.color;

            }, (ary: IDBChart2Map[]): IDVEventsCategoryByColor => {
                let middle = ary.reduce((final, value) => {
                    final[value] = (final[value] || 0) + 1;
                    return final;
                }, {});

                /// categorize
                return Object.keys(middle).reduce((final, name) => {
                    final.push({ name, value: middle[name] });
                    return final;
                }, []);
            }
        );
    }
}

/* chart3 data -- by type */
export type IDVEventsCategoryByType =
    Array<{ name: string, value: number }>;
type IDBChart3Map = string/*type*/;
const dv_events_chart3_category_by_type = {
    data: (): IDVEventsCategoryByType => {
        return db_events.mapReduce(
            (value: IDBEvents): IDBChart3Map => {
                let isIdentify = value.name != undefined;
                return isIdentify ? EChart1Type.Identify : EChart1Type.Unknown;

            }, (ary: IDBChart3Map[]): IDVEventsCategoryByType => {
                let middle = ary.reduce((final, value) => {
                    final[value] = (final[value] || 0) + 1;
                    return final;
                }, {});

                /// categorize
                return Object.keys(middle).reduce((final, name) => {
                        final.push({ name, value: middle[name] });
                        return final;
                    }, [])
                    .sort((a, b) => a.value - b.value);
            }
        );
    }
}

export {
    db_events,
    dv_events_chart1_category_by_date,
    dv_events_chart2_category_by_color,
    dv_events_chart3_category_by_type,
};