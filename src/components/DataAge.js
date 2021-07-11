import React from 'react';
import {List, Colors} from 'react-native-paper';

function DataAge(props) {
  const date = new Date(props.date);

  // Data age in minutes
  var age = (new Date() - date) / 1000 / 60;
  var message;
  var color = 'default';

  if (age < 29) {
    message = 'Atualizado há menos de 30 minutos';
    message = 'DarkGreen';
  }
  if (age > 29) {
    message = 'Atualizado há mais de 30 minutos';
    color = 'DarkGoldenRod';
  }
  if (age > 59) {
    message = 'Atualizado há mais de 1 hora';
    color = 'orange';
  }
  if (age > 2 * 60) {
    message = 'Atualizado há mais de 2 horas';
    color = 'red';
  }
  if (age > 3 * 60) {
    message = 'Atualizado há mais de 3 horas';
    color = 'firebrick';
  }
  if (age > 24 * 60) {
    message = 'Atualizado há mais de 1 dia';
    color = 'darkred';
  }
  if (age > 2 * 24 * 60) {
    message = 'Atualizado há mais de 2 dias';
    color = 'maroon';
  }

  return (
    <List.Item
      title="Última atualização"
      descriptionStyle={color != 'default' ? {color: color} : null}
      description={message}
      left={() => <List.Icon color={Colors.blue500} icon="clock" />}
    />
  );
}

export default DataAge;
