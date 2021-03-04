/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";

@Component
export default class RegisterSuccessModal extends Vue {
    @Prop({ type: Boolean, required: false })
    visible: boolean;

    @Emit('update:visible')
    doUpdateVisible(value: boolean) { return value; }
}