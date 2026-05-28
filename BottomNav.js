import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fonts, radius } from '../theme';

const HomeIcon = ({ active }) => (
  // House outline
  <View style={{ width: 22, height: 22, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 18, color: active ? colors.bg : colors.textMuted }}>⌂</Text>
  </View>
);

const tabs = [
  { id: 'home',   label: 'Home',   emoji: '⌂' },
  { id: 'treino', label: 'Treino', emoji: '◈' },
  { id: 'crew',   label: 'Crew',   emoji: '◎' },
  { id: 'perfil', label: 'Perfil', emoji: '◉' },
];

export default function BottomNav({ active, onPress }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onPress(tab.id)}
              style={styles.btn}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrap, isActive && styles.iconActive]}>
                <Text style={[styles.icon, isActive && styles.iconTextActive]}>
                  {tab.emoji}
                </Text>
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(16,19,24,0.95)',
    borderRadius: radius.xl,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 8,
  },
  icon: {
    fontSize: 18,
    color: colors.textMuted,
  },
  iconTextActive: {
    color: colors.bg,
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    color: colors.textMuted,
    fontFamily: fonts.bodyMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelActive: {
    color: colors.accent,
    fontFamily: fonts.bodySemiBold,
  },
});
