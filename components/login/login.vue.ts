import { Vue, Component } from "vue-property-decorator";
import { RegisterLoginRouter } from '@/../core';
import { ModalResponse } from '@/../components/modal';

// @RegisterLoginRouter({
//     name: "_('wb_Login')",
//     path: "/login",
//     disableContainer: true
// })
@Component
export default class Login extends Vue {
    private username: string = '';
    private password: string = '';

    async Login() {
        await this.$login({
            username: this.username,
            password: this.password
        });
        this.$router.push("/");
    }
}
