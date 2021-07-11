import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {List, Title, Colors, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import queueHelpers from '../helpers/queueHelpers';
import styles from './ListItem.styles';

const ListItem = props => {
  const navigation = useNavigation();

  return (
    <List.Item
      key={props.item.id}
      style={styles.listItem}
      title={
        <Title style={styles.title}>
          {props.item.location} - {props.item.name}
        </Title>
      }
      description={queueHelpers.timingInfo(
        props.item.waitTime,
        props.item.updated_at,
      )}
      left={() => (
        <Avatar.Icon
          {...props}
          icon="needle"
          color={'white'}
          size={40}
          style={{
            backgroundColor: queueHelpers.queueColor(props.item.lightColor),
            margin: 10,
          }}
        />
      )}
      onPress={() => navigation.navigate('Detalhes', {item: props.item})}
    />
  );
};

export default ListItem;
