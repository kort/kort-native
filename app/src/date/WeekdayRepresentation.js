/**
 * this helper library transforms an array of weekdays represented as numbers,
 * e.g. Mon-Wed, Fr,Sa being [0,1,2,4,5] and returns the appropriate String
 * representation
 * @param {*} weekdays 
 */
const WeekdayRepresentation = (weekdays) => {
    return (
        handleWeekdayRange(weekdays)
    );
};

const abbrevs = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function generateBoolArray(weekdays) {
    const boolArray = [false, false, false, false, false, false, false];
    for (let i = 0; i < weekdays.length; ++i) {
        boolArray[weekdays[i]] = true;
    }
    return boolArray;
}
    
function handleWeekdayRange(weekdays) {
    const boolArray = generateBoolArray(weekdays);

    const groupArray = [];
    let currentGroup = [];
    for (let i = 0; i < boolArray.length; ++i) {
        if (boolArray[i]) {
            currentGroup.push(i);
        } else if (currentGroup.length > 0) {
            groupArray.push(currentGroup);
            currentGroup = [];
        }
    }
    if (currentGroup.length > 0) {
        groupArray.push(currentGroup);  
    }

    //check if last and first group need to be merged
    if (groupArray.length > 1) {
        const firstGroupFirstValue = groupArray[0][0];
        const lastGroup = groupArray[groupArray.length - 1];
        const lastGroupLastValue = lastGroup[lastGroup.length - 1];
        if (firstGroupFirstValue === 0 && lastGroupLastValue === 6 && lastGroup.length > 1) {
            const firstGroup = groupArray.shift();
            groupArray[groupArray.length - 1] = lastGroup.concat(firstGroup);
        }
    }

    //replace numbers with corresponding abbreviations
     let output = '';
     let appender = '';
     for (const group of groupArray) {
        output += appender;
        appender = ',';
        if (group.length === 1) {
            output += abbrevs[group[0]];
        } else if (group.length === 2) {
            output += `${abbrevs[group[0]]},${abbrevs[group[1]]}`;
        } else {
            output += `${abbrevs[group[0]]}-${abbrevs[group[group.length - 1]]}`;
        }
     }
     return output;
}

export default WeekdayRepresentation;
