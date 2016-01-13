
export function handleNestedDefaultProps(props, nestedDefaultProps) {
    for (const [nestedPropToMerge, nestedPropContent] of Object.entries(nestedDefaultProps)) {

        props = Object.assign({}, nestedPropContent, props);
    }
    return Object.assign({}, props);
}

export function cloneNestedArray(nestedArray) {
    const copyArray = nestedArray.slice();
    return copyArray.map((dataObject) => {
        dataObject = Object.assign({}, dataObject);
        for (const i in dataObject) {
            if (dataObject.hasOwnProperty(i) && typeof dataObject[i] === 'object') {
                dataObject[i] = Object.assign({}, dataObject[i]);
            }
        }
        return dataObject;
    });
}
