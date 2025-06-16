import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Text from './Text';

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <Text size={16}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor:'#111111'
  },
});