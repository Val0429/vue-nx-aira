/// put your re-export here
// export * from './modal';





import Vue from 'vue';

/// register components
const requireComponent = require.context(
    "./../components",
    true,
    /\/.*\.vue?$/
);

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = `ivc-${fileName.split("/").pop().replace(/\.vue$/, "")}`;

    Vue.component(
        componentName,
        componentConfig.default || componentConfig
    );
});