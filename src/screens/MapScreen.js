import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';

const MapScreen = () => {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    fetch('https://sns.afluencia.io/centros/search')
      .then(response => response.json())
      .then(json => {
        setCenters(json.data);
      })
      .catch(error => console.error(error))
      .finally(() => console.log('done'));
  }, []);

  return (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      showsMyLocationButton={true}>
      {centers
        .filter(el => {
          return el.latitude !== '' && el.longitude !== '';
        })
        .map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.latitude.replace('– ', '-')),
              longitude: parseFloat(marker.longitude.replace('– ', '-')),
            }}
            title={marker.location}
            description={marker.name}
          />
        ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
