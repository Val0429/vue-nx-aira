<template>
    <b-form-group
        v-bind:id="'form-group-' + _uid"
        v-bind:label="label"
        v-bind:label-for="'input-' + _uid"
        >
        <b-row>
            <b-col
                v-if="type === 'date' || type === 'datetime'"
                v-bind:sm="type === 'date' ? 6 : 6">
                <b-form-datepicker
                    v-bind="{ ...$attrs, class: undefined }"
                    v-bind:id="'input-' + _uid"
                    v-bind:value="inputDate"
                    v-on:input="dateChanged($event)"
                    :placeholder="$attrs.placeholder || _('mb_Date_Not_Selected')"
                    
                    boundary="window"
                    :no-close-on-select="true"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    :label-reset-button="_('wb_Reset')"
                    :label-close-button="_('wb_Close')"
                    :label-no-date-selected="_('mb_Date_Not_Selected')"
                    :label-no-time-selected="_('mb_Time_Not_Selected')"
                    label-help=""

                    reset-button
                    close-button
                    />
                <b-form-invalid-feedback v-if="(type ==='date' || type === 'datetime') && this.invalid">
                    {{ this.invalid }}
                </b-form-invalid-feedback>
            </b-col>
            <b-col
                v-if="type === 'datetime' || type === 'time'"
                v-bind:sm="type === 'time' ? 6 : 6">
                <b-form-timepicker
                    v-bind="{ ...$attrs, class: undefined }"
                    v-bind:id="'input-' + _uid + '-2'"
                    v-bind:value="inputTime"
                    v-on:input="timeChanged($event)"
                    :placeholder="$attrs.placeholder || _('mb_Time_Not_Selected')"

                    boundary="window"
                    :no-close-on-select="true"
                    :label-reset-button="_('wb_Reset')"
                    :label-close-button="_('wb_Close')"
                    :label-no-date-selected="_('mb_Date_Not_Selected')"
                    :label-no-time-selected="_('mb_Time_Not_Selected')"
                    label-help=""

                    reset-button
                    close-button
                    />
                <b-form-invalid-feedback v-if="(type ==='time') && this.invalid">
                    {{ this.invalid }}
                </b-form-invalid-feedback>
            </b-col>
        </b-row>

    </b-form-group>

</template>

<script lang="ts" src="./form-datetime.vue.ts" />

<style type="scss" scoped>
.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-sm-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-md-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-lg-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl, .col-xl-auto {
    position: inherit !important;
}
.form-control.focus {
    background: #FFFFFF11 !important;
}

* /deep/ label.form-control {
    color: white;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}
* /deep/ label.form-control:hover {
    overflow: visible !important;
}
* /deep/ .b-form-timepicker > button > .b-icon.bi {
    color: white;
}
* /deep/ .b-form-datepicker > button > .b-icon.bi {
    color: white;
}
</style>