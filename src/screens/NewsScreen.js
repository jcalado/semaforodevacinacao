import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Appbar, Title, ActivityIndicator, Searchbar} from 'react-native-paper';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {set} from 'react-native-reanimated';

import NewsItem from '../components/NewsItem';
import AppContext from '../contexts/appContext';

function compareStrings(a, b) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return a < b ? -1 : a > b ? 1 : 0;
}

const NewsScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('https://www.adventistas.org.pt/news.json')
      .then(response => response.json())
      .then(json => {
        setNews(
          json.sort((a, b) => {
            return compareStrings(b.created_at, a.created_at);
          }),
        );
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const _goBack = () => console.log('Went back');

  const renderItem = props => {
    return <NewsItem item={props.item} navigation={navigation} />;
  };

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'red',
      accent: 'yellow',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList data={news} renderItem={renderItem} />
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  search: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default NewsScreen;
