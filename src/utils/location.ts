export const getDistFrom2Loc = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const radOfEarth = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radOfEarth * c;
    return distance;
}
function deg2rad(deg: any) {
    return deg * (Math.PI / 180)
}
export function sortBuble(unOrderedItems: any) {
    for (var i = 0; i < unOrderedItems.length; i++) {
        for (var j = 0; j < (unOrderedItems.length - i - 1); j++) {
            if (unOrderedItems[j]['distance'] > unOrderedItems[j + 1]['distance']) {
                var temp = unOrderedItems[j];
                unOrderedItems[j] = unOrderedItems[j + 1]
                unOrderedItems[j + 1] = temp
            }
        }
    }
    return unOrderedItems;
}


