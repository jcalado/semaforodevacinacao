import React from 'react';
import {StyleSheet, View, ScrollView, Linking} from 'react-native';
import {Card, List, Colors, FAB} from 'react-native-paper';

import DataAge from '../components/DataAge';

const mapsUrl = (lat, lon) => {
  return `http://maps.google.com/maps?z=20&t=m&q=${lat},${lon}&ll=${lat},${lon}`;
};

const CenterDetailsScreen = props => {
  var lightColor = 'black';

  if (props.route.params.item.lightColor != null) {
    lightColor = props.route.params.item.lightColor;
  }

  if (props.route.params.item.lightColor === 'green') {
    lightColor = Colors.green400;
  }

  if (props.route.params.item.lightColor === 'yellow') {
    lightColor = Colors.yellowA700;
  }

  if (props.route.params.item.lightColor === 'red') {
    lightColor = Colors.red700;
  }

  function parseWaitTime(waitTime) {
    if (waitTime.includes('entre 30m e 1 hora')) {
      return 'Entre 30m e 1 hora';
    } else if (waitTime.includes('superior a 1 hora')) {
      return 'Superior a 1 hora';
    } else if (waitTime.includes('inferior a 30m')) {
      return 'Inferior a 30 minutos';
    } else if (waitTime.includes('N/D')) {
      return 'Sem informação';
    } else {
      return waitTime;
    }
  }

  const item = props.route.params.item;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Title
            titleNumberOfLines={2}
            title={item.location + '\n' + item.name}
            titleStyle={styles.title}
          />
          <List.Item
            title="Morada"
            description={item.address}
            left={() => <List.Icon color={Colors.blue500} icon="home" />}
            onPress={() => {
              Linking.openURL(mapsUrl(item.latitude, item.longitude));
            }}
          />
          <List.Section>
            <List.Subheader>Estado</List.Subheader>
            <List.Item
              title="Tempo de espera"
              description={parseWaitTime(item.waitTime)}
              left={() => <List.Icon color={lightColor} icon="clock" />}
            />
            <DataAge date={item.last_light_log_created_at} />
          </List.Section>
          <List.Section>
            <List.Subheader>Horário</List.Subheader>
            <List.Item
              title="Abertura"
              description={item.schedule_start}
              left={() => <List.Icon color={Colors.blue500} icon="clock" />}
            />
            <List.Item
              title="Fecho"
              description={item.schedule_end}
              left={() => <List.Icon color={Colors.blue500} icon="clock" />}
            />
          </List.Section>
          <List.Section>
            <List.Subheader>Localização</List.Subheader>
            <List.Item
              title="ARS"
              description={item.ars}
              left={() => (
                <List.Icon color={Colors.blue600} icon="map-marker" />
              )}
            />
            <List.Item
              title="ACES"
              description={item.aces}
              left={() => (
                <List.Icon color={Colors.blue300} icon="map-marker" />
              )}
            />
            <List.Item
              title="Distrito"
              description={item.district}
              left={() => (
                <List.Icon color={Colors.blue300} icon="map-marker" />
              )}
            />
            <List.Item
              title="Município"
              description={item.county}
              left={() => (
                <List.Icon color={Colors.blue300} icon="map-marker" />
              )}
            />
          </List.Section>
        </Card>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="navigation"
        onPress={() => {
          console.log('Navegar para centro');
          Linking.openURL(mapsUrl(item.latitude, item.longitude)).catch(err =>
            console.error("Couldn't load page", err),
          );
        }}
      />
    </View>
  );
};

export default CenterDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECEFF4',
  },
  card: {
    margin: 20,
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 400,
    backgroundColor: 'red',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.green200,
  },
});
