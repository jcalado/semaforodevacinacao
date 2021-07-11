import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Surface, Paragraph, Title, List} from 'react-native-paper';

const NewsItem = props => {
  return (
    <List.Item
      style={styles.listItem}
      title={<Title style={styles.title}>{props.item.title}</Title>}
      description={props.item.created_at}
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
  },
  title: {
    color: '#1976d2',
    margin: 0,
    fontSize: 14,
  },
});

export default NewsItem;
