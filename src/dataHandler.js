
function isFlatArray(data) {
    return (Array.isArray(data) && typeof data[0] !== 'object');
}

function isNestedArray(data) {
    return (Array.isArray(data) && Array.isArray(data[0]));
}

function isCollectionOfDict(data) {
    return (Array.isArray(data) && typeof data[0] === 'object');
}

function isDict(data) {
    return (!Array.isArray(data) && typeof data === 'object');
}


export default function  (data) {
    let newData = [];
    switch (true) {
        case (isFlatArray(data)):
            break;
        case (isNestedArray(data)):
            console.log('yo');
            break;
        case (isCollection(data)):
            console.log('yo');
            break;
        case (isJSON(data)):
            console.log('yo');
            break;
        default:
            console.log('yo');
    }

    // data = [
    //     {
    //         label: 1,
    //         value: 1,
    //         key:
    //     }
    // ]
    return data;
}
