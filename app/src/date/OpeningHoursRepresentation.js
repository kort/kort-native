/**
 * this helper library transforms an array of date entries
 * into a according opening_hours OSM String
 * @param {*} entries 
 */
const OpeningHoursRepresentation = (entries) => {
            console.log(entries);
    return (
        constructOHRep(entries)
    );
};


function constructOHRep(entries) {
    let string = '';

    for (let i = 0; i < entries.length; ++i) {
        const entry = entries[i];
        string += entry.formattedDays;
        string += ' ';

        let timeEntry = entry.timeRangeEntries[0];
        string += `${timeEntry.fromTime}-${timeEntry.toTime}`;
        
        if (!entry.timeRangeEntries[0].openEnd) {
            if (entry.timeRangeEntries.length > 1) {
                timeEntry = entry.timeRangeEntries[1];
                string += `,${timeEntry.fromTime}-${timeEntry.toTime}`;  
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


export default OpeningHoursRepresentation;
