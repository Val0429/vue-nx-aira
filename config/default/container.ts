import { VueConstructor } from 'vue';
import { Basic } from '@/../containers/Basic';
//import { CoreUI } from '@/../containers/CoreUI';
// import CoreUI from '@/container/CoreUI.vue';
// import CoreUI from '@/container/CoreUI-Blue.vue';
import { Config } from '@/../config/default/container';

import CoreUIWhite from '@/container/CoreUI.vue';
import CoreUIBlue from '@/container/CoreUI-Blue.vue';
import { AiraBlack } from '@/container/Aira-Black';

var config: Config = {
    container: CoreUIWhite
}
export default config;
