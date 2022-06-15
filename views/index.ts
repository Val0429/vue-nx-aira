import { RegisterRouter as $ } from '@/../core';
import CoreUIWhite from '@/container/CoreUI.vue';
import CoreUIBlue from '@/container/CoreUI-Blue.vue';

import Home from './components/Home.vue';
import NFTAutoTools from './components/NFTAutoTools.vue';
import NFTTools from './components/NFTTools.vue';
import Chart from './components/Chart.vue';
import SaleAnalyze from './components/SaleAnalyze.vue';
import LooksRare from './components/LooksRare.vue';
import OtherdeedSaleAnalyze from './components/OtherdeedSaleAnalyze.vue';
import OtherdeedResourceFilter from './components/OtherdeedResourceFilter.vue';

// import VideoSource from './components/VideoSource.vue';
// import License from './components/License.vue';
// import Logs from './components/Logs.vue';
// import VAST2Configuration from './components/VAST2Configuration.vue';
// import SystemConfiguration from './components/SystemConfiguration.vue';
// import Test from './components/Test.vue';

$({ path: '/', name: "Main", redirect: '/home', permission: false })();

    $({ path: '/home', name: "_('w_Home')", permission: "/looksrare-revenue" })(Home);
    $({ path: '/nftautotools', name: "自動買賣工具", permission: "/looksrare-revenue"})(NFTAutoTools);
    $({ path: '/nfttools', name: "買賣小工具", permission: "/looksrare-revenue"})(NFTTools);
    $({ path: '/chart', name: "NFT歷史紀錄", permission: "/looksrare-revenue"})(Chart);
    $({ path: '/saleanalyze', name: "NFT賣出數據分析", permission: "/looksrare-revenue"})(SaleAnalyze);
    $({ path: '/looksrare', name: "LooksRare掛單收益", permission: "/looksrare-revenue"})(LooksRare);
    $({ path: '/otherdeedanalyze', name: "Otherdeed賣出數據", permission: "/otherdeed-analyze"})(OtherdeedSaleAnalyze);
    $({ path: '/otherdeedresourcefilter', name: "Otherdeed資源篩選", permission: "/otherdeed-resource-filter" })(OtherdeedResourceFilter);

// $({ path: '/', name: "Main", redirect: '/home', permission: false })();

//     $({ path: '/home', name: "_('w_Home')", permission: false })(Home);

//     $({ path: '/sources', name: "_('w_Sources')", icon: 'fa-video-camera', permission: false })();
//         $({ path: '/sources/video-source', name: "_('m_VideoSource')", icon: 'fa-video-camera', permission: false })(VideoSource);

//     $({ path: '/settings', name: "_('w_Settings')", icon: 'fa-cogs', permission: false })();
//         $({ path: '/settings/license', name: "_('w_License')", icon: 'fa-certificate', permission: false })(License);
//         $({ path: '/settings/vast2-configuration', name: "_('m_VAST2Configuration')", icon: 'fa-server', permission: false })(VAST2Configuration);
//         $({ path: '/settings/system-configuration', name: "_('m_SystemConfiguration')", icon: 'fa-cog', permission: false })(SystemConfiguration);

//     $({ path: '/logs', name: "_('w_Logs')", icon: 'fa-list', permission: false})(Logs);

//     $({ path: '/walk-through', name: "", disableContainer: true, permission: false })(WalkThrough);
