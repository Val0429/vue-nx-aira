<template>
    <iv-route-transition>
    <div key="main">
        <b-button @click="logout">Logout</b-button>

        <iv-language-button />
        <iv-theme-button />

        <div style="color: var(--primary)">Hello!</div>

        <ul>
            <li>server requirement
                <ul>
                    <li>only support server framework > 1.06</li>
                    <li>patch /users/login: user login provide session id</li>
                    <li>patch /apis: should work & provide framework version, server version</li>
                </ul>
            </li>
            <li>prefix iv-*.</li>
            <li>Card :label move out from :data.</li>
            <li>Element no need to provide server.</li>
            <li>$server / $user / $permission</li>
            <li>Custom element will prefix ivc-*.</li>
        </ul>
    </div>
    </iv-route-transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';

@Component
export default class Components extends Vue {
    private async logout() {
        await this.$logout();
        this.$goHome();
    }
}
</script>
