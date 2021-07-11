import {Colors} from 'react-native-paper';

const helpers = {
  timingInfo: function timingInfo(waitTime, updated_at) {
    const date = new Date(updated_at);

    // Data age in minutes
    var age = (new Date() - date) / 1000 / 60;
    var updated_message;

    if (age < 29) {
      updated_message = 'Atualizado < 30min';
    }
    if (age > 29) {
      updated_message = 'Atualizado > 30min';
    }
    if (age > 59) {
      updated_message = 'Atualizado > 1h';
    }
    if (age > 2 * 60) {
      updated_message = 'Atualizado > 2h';
    }
    if (age > 3 * 60) {
      updated_message = 'Atualizado > 3h';
    }
    if (age > 24 * 60) {
      updated_message = 'Atualizado > 1d';
    }
    if (age > 2 * 24 * 60) {
      updated_message = 'Atualizado > 2d';
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
  },
  queueColor: function queueColor(lightColor) {
    var color = 'black';

    if (lightColor === null) {
      return color;
    }

    if (lightColor != null) {
      color = lightColor;
    }

    if (lightColor === 'green') {
      color = Colors.green700;
    }

    if (lightColor === 'yellow') {
      color = Colors.yellowA700;
    }

    if (lightColor === 'red') {
      color = Colors.red700;
    }

    return color;
  },
};

export default helpers;
