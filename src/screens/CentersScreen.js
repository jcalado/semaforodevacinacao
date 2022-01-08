import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import ListItem from '../components/ListItem';

function compareStrings(a, b) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return a < b ? -1 : a > b ? 1 : 0;
}

const CentersScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [centers, setCenters] = useState([]);
  const [allCenters, setAllCenters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch('https://sns.afluencia.io/centros/search')
      .then(response => response.json())
      .then(json => {
        setCenters(
          json.data.sort((a, b) => {
            return compareStrings(a.location, b.location);
          }),
        );
        setAllCenters(
          json.data.sort((a, b) => {
            return compareStrings(a.location, b.location);
          }),
        );
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [refreshing]);

  const renderItem = props => {
    return <ListItem item={props.item} navigation={props.navigation} />;
  };

  const refreshItems = props => {
    setRefreshing(false);
    console.log('Refreshed data');
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
          <FlatList
            data={centers}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                colors={['#9Bd35A', '#689F38']}
                refreshing={refreshing}
                onRefresh={refreshItems.bind(this)}
              />
            }
            ListHeaderComponent={
              <View>
                <Searchbar
                  style={styles.search}
                  placeholder="Localidade"
                  onChangeText={value => {
                    setCenters(
                      allCenters.filter(el => {
                        return (
                          el.location
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                          el.name.toLowerCase().includes(value.toLowerCase())
                        );
                      }),
                    );
                  }}
                />
              </View>
            }
          />
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    fontSize: 30,
    color: '#A3BE8C',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  search: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  provider: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  menu: {
    flex: 1,
  },
});

export default CentersScreen;
