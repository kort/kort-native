/**
 * this helper library transforms an array of date entries
 * into an according opening_hours OSM String
 * @param {*} entries 
 */
const OpeningHoursRepresentation = (entries) => {
    return (
        constructOHRep(entries)
    );
};

function constructOHRep(entries) {
    let string = '';

    for (let i = 0; i < entries.length; ++i) {
        const entry = entries[i];
        string += entry.formattedDays != null ? `${entry.formattedDays}` : '';
        let timeEntry = entry.timeRangeEntries[0];
        string += getTimeFromEntry(timeEntry, ' ');
        
        if (!entry.timeRangeEntries[0].openEnd) {
            if (entry.timeRangeEntries.length > 1) {
                timeEntry = entry.timeRangeEntries[1];
                string += getTimeFromEntry(timeEntry, ',');  
            }
        } else {
            string += '+';
        }

        if (i !== entries.length - 1) {
            string += ';';
        }
    }

    return string;
}

const getTimeFromEntry = (timeEntry, prefix) => {
    if (timeEntry.fromTime !== '' && timeEntry.toTime !== '') {
        return `${prefix}${timeEntry.fromTime}-${timeEntry.toTime}`;
    }
    return '';
};

export default OpeningHoursRepresentation;
