/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

@Component
export class InvestigationRow extends Vue {
    @Model('input', { type: String })
    value: string;

    private get tmp_image_count() {
        return `image${(parseInt(this.value, 10)%5)+1}`;
    }
}
export default InvestigationRow;