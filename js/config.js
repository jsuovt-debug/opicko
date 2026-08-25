// window.OPK_CONFIG = { freeShip: 100, returns: 14, dropDate: '…' }
// mirrors your future opk-config — marquee/USP/countdown read it
/* OPICKO config — mirrors future wp opk-config. Change values, surfaces update. */
window.OPK_CONFIG = {
    freeShip: 100,          // tentative — set null to hide everywhere
    returnsDays: 14,
    dispatch: '24–48h',
    dropDate: null,         // ISO string when drop is named; null = now + 30d
    bnpl: ['AFTERPAY', 'ZIP']
};