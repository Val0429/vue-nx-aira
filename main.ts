import { DisableLoginRouter, obDefaultRoute } from "@/../core/router";

import "echarts";
import Vue from 'vue';
import { $global, Global } from './config/default/global';
import { zip } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { IDBEvents } from './config/default/globals/db';

DisableLoginRouter();

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

/// test data: write test face & person when criteria change
const min_time = 20*1000;       /* 20 seconds */
const max_time = 30*60*1000;    /* 30 minutes */
zip(
    $global.timeperiod_value$,
    $global.camera_value$,
    $global.attribute_value$
).pipe(throttleTime(100))
.subscribe(o => {
    /// clean old events / make db_events
    {
        let db_events = Global.db_events;
        /// clean old data
        db_events.findAndRemove();

        /// prepare variables
        const v_time = $global.timeperiod_value$.value;
        const v_cameras = $global.camera_value$.value;
        const v_attributes = $global.attribute_value$.value;

        const a_time = {
            from: v_time.from.valueOf(),
            to: v_time.to.valueOf()
        };
        const a_cameras = v_cameras.selectAll !== true ?
            (v_cameras.values || []) :
            Object.keys($global.cameras$.value);
        const a_attributes = v_attributes.selectAll !== true ?
            (v_attributes.values || []) :
            Object.keys($global.attributes$.value);

        const randTime = () => Math.floor(Math.random()*(max_time-min_time)) + min_time;
        const randPos = () => ({x0:0,y0:0,x1:1,y1:1});
        const randType = (): IDBEvents["type"] => ["nx.base.Person", "nx.base.Face"][Math.floor(Math.random() * 2)] as any;
        const randColor = () => a_attributes[Math.floor(Math.random()*a_attributes.length)];
        const randName = (optional?) => {
            if (optional && Math.floor(Math.random()*2) === 0) return;
            const names = ["Frank", "Val", "Tulip"];
            return names[Math.floor(Math.random()*names.length)];
        }

        /// each camera
        for (let camera of a_cameras) {
            let time = a_time.from + randTime();
            while (time < a_time.to) {
                let type = randType();
                let obj: IDBEvents = {
                    time,
                    camera,
                    position: randPos(),
                    type,
                    color: randColor(),
                    name: randName(type === "nx.base.Person")
                }
                db_events.insert(obj);
                time += randTime();
            }
        }

        console.log(db_events.count(), "test events created.");
    }

    $global.chart1_value$.next(
        Global.dv_events_chart1_category_by_date.data()
    );
    console.log("chart1 data: ", $global.chart1_value$.value);
});
