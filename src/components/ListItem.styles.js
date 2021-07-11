import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

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

export default styles;
