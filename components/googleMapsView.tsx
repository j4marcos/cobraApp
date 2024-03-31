import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet } from 'react-native';

export function GoogleMapsView() {
  return (
      <MapView style={styles.map} provider={PROVIDER_GOOGLE}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});