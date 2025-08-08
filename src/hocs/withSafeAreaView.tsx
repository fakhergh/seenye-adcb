import { ComponentType } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { colors } from '@/styles/colors';

export function withSafeAreaView<P>(WrappedComponent: ComponentType<P>) {
  return function SafeAreaWrapped(props: P & {}) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <WrappedComponent {...props} />
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
});
