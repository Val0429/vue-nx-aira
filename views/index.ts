import { RegisterRouter as $ } from '@/../core';
import CoreUIWhite from '@/container/CoreUI.vue';
import CoreUIBlue from '@/container/CoreUI-Blue.vue';

import Home from './components/Home.vue';
import VideoSource from './components/VideoSource.vue';
import License from './components/License.vue';
import SystemConfiguration from './components/SystemConfiguration.vue';

$({ path: '/', name: "Main", redirect: '/home', permission: false })();

    $({ path: '/home', name: "_('w_Home')", permission: false })(Home);

    $({ path: '/sources', name: "_('w_Sources')", icon: 'fa-video-camera', permission: false })();
        $({ path: '/sources/video-source', name: "_('m_VideoSource')", icon: 'fa-video-camera', permission: false })(VideoSource);

    $({ path: '/settings', name: "_('w_Settings')", icon: 'fa-cogs', permission: false })();
        $({ path: '/settings/license', name: "_('w_License')", icon: 'fa-certificate', permission: false })(License);
        $({ path: '/settings/system-configuration', name: "_('m_SystemConfiguration')", icon: 'fa-cog', permission: false })(SystemConfiguration);
