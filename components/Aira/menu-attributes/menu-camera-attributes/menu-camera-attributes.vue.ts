/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

@Component
export class MenuCameraAttributes extends Vue {
    @Model('input', {
        required: false,
    })
    value!: any;

    @Prop({
        required: false,
    })
    label!: any;

    @Prop({
        required: false,
    })
    items!: any;

    private getValueString(value) {
        if (!value || value.selectAll === undefined) return "";
        if (value.selectAll == true) return "All";
        if (!value.values) return "None";
        let nameList = value.values.map(o => this.items[o]);
        return nameList.join(", ");
    }
    private getContent(value) {
        const maxLen = 10;
        if (!value || value.selectAll === undefined) return "";
        if (value.selectAll == true) return "All";
        if (!value.values) return "None";
        let nameList = value.values.map(o => this.items[o]);

        let nameCount = nameList.length;
        let finalNames = [];
        let finalLen = 0;
        for (let name of nameList) {
            finalNames.push(name);
            finalLen += name.length;
            if (finalLen >= maxLen) break;
        }

        return finalNames.join(", ") +
            (nameCount===finalNames.length ? "" : `..(${nameCount-finalNames.length})`)
            ;

        // return value.values.map(o => this.items[o]).join(", ");
    }
}
export default MenuCameraAttributes;