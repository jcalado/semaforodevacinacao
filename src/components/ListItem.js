import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {List, Title, Colors, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

function timingInfo(waitTime, updated_at) {
  const date = new Date(updated_at);

  // Data age in minutes
  var age = (new Date() - date) / 1000 / 60;
  var updated_message;
  var color = 'default';

  if (age < 29) {
    updated_message = 'Atualizado < 30min';
    updated_message = 'DarkGreen';
  }
  if (age > 29) {
    updated_message = 'Atualizado > 30min';
    color = 'DarkGoldenRod';
  }
  if (age > 59) {
    updated_message = 'Atualizado > 1h';
    color = 'orange';
  }
  if (age > 2 * 60) {
    updated_message = 'Atualizado > 2h';
    color = 'red';
  }
  if (age > 3 * 60) {
    updated_message = 'Atualizado > 3h';
    color = 'firebrick';
  }
  if (age > 24 * 60) {
    updated_message = 'Atualizado > 1d';
    color = 'darkred';
  }
  if (age > 2 * 24 * 60) {
    updated_message = 'Atualizado > 2d';
    color = 'maroon';
  }

  if (waitTime.includes('entre 30m e 1 hora')) {
    return '30m a 1hr. ' + updated_message;
  } else if (waitTime.includes('superior a 1 hora')) {
    return '> 1h. ' + updated_message;
  } else if (waitTime.includes('inferior a 30m')) {
    return '< 30min. ' + updated_message;
  } else if (waitTime.includes('N/D')) {
    return 'Sem informação. ' + updated_message;
  } else {
    return waitTime;
  }
}

const ListItem = (props) => {
  const navigation = useNavigation();
  var lightColor = 'black';

  if (props.item.lightColor != null) {
    lightColor = props.item.lightColor;
  }

  if (props.item.lightColor == "green") {
    lightColor = Colors.green400;
  }

  if (props.item.lightColor == "yellow") {
    lightColor = Colors.yellowA700;
  }

  if (props.item.lightColor == "red") {
    lightColor = Colors.red700;
  }

  return (
    <List.Item
      style={styles.listItem}
      title={
        <Title style={styles.title}>
          {props.item.location} - {props.item.name}
        </Title>
      }
      description={timingInfo(props.item.waitTime, props.item.updated_at)}
      left={props => <Avatar.Icon {...props} icon="needle" color={'white'}  size={40} style={{backgroundColor: lightColor, margin: 10}} />}
      onPress={() => navigation.navigate('Detalhes', {item: props.item})}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(209, 213, 219, 0.3)',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.blue400,
    margin: 0,
    padding: 0,
    fontSize: 14,
  },
});

export default ListItem;
