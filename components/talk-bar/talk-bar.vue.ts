/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";
import { toEnumInterface, NumberHelper } from '@/../core';
import { AlertResponse } from '@/../components/modal/alert-response';
import { detectTradeTypeSuccess } from '@/helpers';

@Component
export default class TalkBar extends Vue {
    @Prop({ type: String, required: false })
    title: string;

    @Prop({ type: String, required: false })
    message: string;

    @Prop({ required: false })
    account: any;

    @Prop({ type: Number, required: false, default: 0 })
    side: number;

    @Prop({ required: false })
    date: Date;

    /// private helper
    private getUsername(account) {
        if (account.user && account.user.username) return account.user.username;
        return account.address.substr(0, 6);
    }

    private getDateText() {
        return this.date ? this.date.toLocaleString("zh-tw").replace(" ", "<BR/>") : "未知";
    }
}
