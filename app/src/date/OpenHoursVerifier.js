import opening_hours from 'opening_hours';

/**
 * this helper library verifies any oh string
 * with the help of the opening_hours library
 * @param {*} entries 
 */
const OpeningHoursVerifier = (ohString) => {
    return (
        verifyOHRepresentation(ohString)
    );
};

function verifyOHRepresentation(ohString) {
    try {
        const oh = new opening_hours(ohString, nominatimObject);
        return true;
    } catch (e) {
        //error in formatting oh string -> not valid
        console.log(e);
        return false;
    }
}

// as long as there is no further requirements it is sufficient to take just one country code
// instead of making a request each time to nominatim
const nominatimObject = { address: { country_code: 'de' } };

export default OpeningHoursVerifier;
