/**
 * This helper class features some methods for handling coordinates
 */
class CoordinateCalculations
{
    /**
     * calculates distance between two point objects 
     * {latitude, longitude} and returns value in m
     */
   static calculateDistance = (p1, p2) => {
        const p = 0.017453292519943295;    // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((p2.latitude - p1.latitude) * p)/2 + 
                c(p1.latitude * p) * c(p2.latitude * p) * 
                (1 - c((p2.longitude - p1.longitude) * p))/2;
        return 12742 * Math.asin(Math.sqrt(a))*1000; // 2 * R; R = 6371 km
    };
}

export default (CoordinateCalculations);
