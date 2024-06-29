export default {
    state: () => ({
        currentYear: new Date().getFullYear(),
        appVersion: 'Version 0.0.0',
    }),
    actions: {},
    getters: {
        currentYear: (state) => state.currentYear,
        appVersion: (state) => state.appVersion,
    }
}