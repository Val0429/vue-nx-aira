import { Vue, Component, Prop } from "vue-property-decorator";
import { RegisterLoginRouter } from '@/../core';
import { ModalResponse } from '@/../components/modal';

@Component
export default class NFTItem extends Vue {
    private eth_image_url: string = "https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg";
    private opensea_image_url: string = "https://opensea.io/static/images/logos/opensea.svg";
    private looksrare_image_url: string = "https://s2.coinmarketcap.com/static/img/coins/200x200/17081.png";

    @Prop({ type: Object })
    attrs: any;
}
