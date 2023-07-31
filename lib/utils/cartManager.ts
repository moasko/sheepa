/**
 * 
 * @param {array} ids 
 */
export const cartData = (ids: any[]): string => {
    if (typeof ids != "object") {
        console.log("please enter an object");
    }
    return ids?.map((id) => {
        return `ids[]=${id.id}`;
    }, []).join('&');
};

export const formatter = new Intl.NumberFormat('fr', {
    style: 'currency',
    currency: 'XOF',
});
