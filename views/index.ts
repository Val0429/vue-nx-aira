import { RegisterRouter as $ } from '@/../core';
import CoreUIWhite from '@/container/CoreUI.vue';
import CoreUIBlue from '@/container/CoreUI-Blue.vue';

import Dashboard from './components/Dashboard.vue';
import Investigation from './components/Investigation.vue';

$({ path: '/', name: "Main", redirect: '/dashboard', permission: false })();
    $({ path: '/dashboard', name: "Dashboard", permission: false })(Dashboard);
    $({ path: '/investigation', name: "Investigation", permission: false })(Investigation);