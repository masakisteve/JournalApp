import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type FABProps = {
  icon: string;
  onPress: () => void;
  style?: ViewStyle;
  color?: string;
};

export const FAB = ({
  icon,
  onPress,
  style,
  color = '#007AFF',
}: FABProps) => {
  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      <Icon name={icon} size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});