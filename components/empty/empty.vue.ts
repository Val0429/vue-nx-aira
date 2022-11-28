/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

@Component
export class Empty extends Vue {
    @Model('input', { type: String })
    value: string;
}
export default Empty;