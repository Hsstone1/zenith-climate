export const getGeolocate = async (latitude: number, longitude: number): Promise<string> => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: latitude, lng: longitude };
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (results && status === 'OK' && results[0]) {
          const { address_components } = results[0];
          let city = '';
          let state = '';
          let country = '';
  
          for (const component of address_components) {
            if (component.types.includes('locality')) {
              city = component.long_name;
            } else if (component.types.includes('administrative_area_level_1')) {
              state = component.short_name;
            } else if (component.types.includes('country')) {
              country = component.long_name;
            }
          }
  
          // Constructing the address with fallbacks
          let formattedAddress = city || state; // Starts with city, fallback to state if city is empty
          if (state && city) { // If both city and state are available, add state
            formattedAddress += `, ${state}`;
          }
          if (country) { // Country is always added
            formattedAddress += formattedAddress ? `, ${country}` : country;
          }
  
          if (!formattedAddress) {
            // Fallback to raw formatted address if no specific components are found
            formattedAddress = latitude + ', ' + longitude;
          }
  
          resolve(formattedAddress);
        } else {
          reject(new Error('Failed to retrieve the address.'));
        }
      });
    });
  };
  

  
export const getElevation = async (latitude: number, longitude: number): Promise<number> => {
    const elevationService = new google.maps.ElevationService();
    const latlng = new google.maps.LatLng(latitude, longitude);
  
    return new Promise((resolve, reject) => {
        elevationService.getElevationForLocations({ locations: [latlng] }, (results, status) => {
            if (status === 'OK') {
                if (results && typeof results[0]?.elevation === 'number') {
                    resolve(results[0].elevation * 3.28084 > -1000 ? results[0].elevation * 3.28084 : -1000);
                } else {
                    reject(new Error('Elevation data is not available.'));
                }
            } else {
                reject(new Error('Failed to retrieve elevation.'));
            }
        });
    });
};
