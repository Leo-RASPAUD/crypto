const getCssTrends = ({ previousPrice, currentPrice }) => {
    let cssClass;
    let icon;
    if (currentPrice > previousPrice) {
        cssClass = 'trendingUp';
        icon = 'trending_up';
    } else if (currentPrice < previousPrice) {
        cssClass = 'trendingDown';
        icon = 'trending_down';
    } else {
        cssClass = 'trendingFlat';
        icon = 'trending_flat';
    }
    return { icon, cssClass };
};

export default {
    getCssTrends,
};
