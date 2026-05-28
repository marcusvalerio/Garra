import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { user, weightHistory, prs } from '../data/mock';

const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

function WeightBar({ value, max, min, index, total }) {
  const normalized = (value - min) / (max - min);
  const isLast = index === total - 1;
  return (
    <View style={styles.barWrap}>
      <View style={styles.barTrack}>
        <View style={[
          styles.barFill,
          { height: `${Math.max(normalized * 100, 8)}%` },
          isLast && styles.barFillActive,
        ]} />
      </View>
      <Text style={styles.barLabel}>{months[index]}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const current = weightHistory[weightHistory.length - 1];
  const start   = weightHistory[0];
  const lost    = (start - current).toFixed(1);
  const maxW    = Math.max(...weightHistory);
  const minW    = Math.min(...weightHistory);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>Sua evolução</Text>
          <Text style={styles.title}>Perfil</Text>
        </View>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.initials}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name} V.</Text>
              <Text style={styles.profileCrew}>{user.crew.join(' · ')}</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            {[
              { label: 'Treinos', value: String(user.workoutsThisYear), sub: 'este ano' },
              { label: 'Perdeu',  value: `-${lost}kg`, sub: 'desde jan', accent: true },
              { label: 'Streak',  value: String(user.streak), sub: 'dias' },
            ].map((s, i) => (
              <View key={i} style={styles.statBox}>
                <Text style={[styles.statValue, s.accent && styles.statValueAccent]}>
                  {s.value}
                </Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Peso */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Evolução de peso</Text>
            <Text style={styles.currentWeight}>{current} kg</Text>
          </View>
          <View style={styles.chartCard}>
            <View style={styles.chart}>
              {weightHistory.map((v, i) => (
                <WeightBar
                  key={i}
                  value={v}
                  max={maxW}
                  min={minW}
                  index={i}
                  total={weightHistory.length}
                />
              ))}
            </View>
            <View style={styles.chartFooter}>
              <View>
                <Text style={styles.chartFooterLabel}>Início</Text>
                <Text style={styles.chartFooterValue}>{start} kg</Text>
              </View>
              <View style={styles.chartFooterCenter}>
                <Text style={styles.chartFooterLabel}>Perdeu</Text>
                <Text style={[styles.chartFooterValue, { color: colors.accent }]}>-{lost} kg</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.chartFooterLabel}>Atual</Text>
                <Text style={styles.chartFooterValue}>{current} kg</Text>
              </View>
            </View>
          </View>
        </View>

        {/* PRs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recordes pessoais</Text>
          <View style={styles.prList}>
            {prs.map((pr, i) => (
              <View
                key={i}
                style={[styles.prRow, i < prs.length - 1 && styles.prRowBorder]}
              >
                <View style={styles.prIcon}>
                  <Text style={{ fontSize: 16 }}>🏆</Text>
                </View>
                <View style={styles.prInfo}>
                  <Text style={styles.prName}>{pr.exercise}</Text>
                  <Text style={styles.prDate}>{pr.date}</Text>
                </View>
                <Text style={styles.prValue}>{pr.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Fotos de evolução */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fotos de evolução</Text>
            <Text style={styles.privateLabel}>🔒 só você vê</Text>
          </View>
          <View style={styles.photoGrid}>
            {['Jan', 'Fev', 'Mar', 'Abr', 'Mai'].map((m, i) => (
              <TouchableOpacity key={i} style={styles.photoSlot} activeOpacity={0.7}>
                <Text style={{ fontSize: 22, marginBottom: 4 }}>📷</Text>
                <Text style={styles.photoMonth}>{m}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.photoAdd} activeOpacity={0.7}>
              <Text style={styles.photoAddText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: colors.bg },
  scroll:  { flex: 1 },
  content: { paddingBottom: 20 },

  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  label:  { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  title:  { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 32, letterSpacing: -1 },

  profileCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileTop:  { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: spacing.md },
  avatar:      { width: 60, height: 60, borderRadius: 18, backgroundColor: colors.blue, borderWidth: 2, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText:  { fontFamily: fonts.heading, color: colors.accent, fontSize: 18 },
  profileInfo: {},
  profileName: { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 20, letterSpacing: -0.5 },
  profileCrew: { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  statsRow:    { flexDirection: 'row', gap: 8 },
  statBox:     { flex: 1, backgroundColor: `${colors.blue}66`, borderRadius: radius.md, padding: 12, alignItems: 'center' },
  statValue:   { fontFamily: fonts.headingBlack, color: colors.textPrimary, fontSize: 20, letterSpacing: -0.5 },
  statValueAccent: { color: colors.accent },
  statLabel:   { fontFamily: fonts.body, color: colors.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 },

  section:       { marginTop: spacing.lg, paddingHorizontal: spacing.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: spacing.sm },
  sectionTitle:  { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 18, letterSpacing: -0.3 },
  currentWeight: { fontFamily: fonts.headingBlack, color: colors.accent, fontSize: 22, letterSpacing: -0.5 },
  privateLabel:  { fontFamily: fonts.body, color: colors.textMuted, fontSize: 11 },

  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chart:     { flexDirection: 'row', alignItems: 'flex-end', height: 80, gap: 4 },
  barWrap:   { flex: 1, alignItems: 'center', gap: 4 },
  barTrack:  { flex: 1, width: '80%', justifyContent: 'flex-end' },
  barFill:   { width: '100%', backgroundColor: `${colors.accent}44`, borderRadius: 4 },
  barFillActive: { backgroundColor: colors.accent },
  barLabel:  { fontFamily: fonts.body, color: colors.textMuted, fontSize: 8, textTransform: 'uppercase' },
  chartFooter:       { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  chartFooterCenter: { alignItems: 'center' },
  chartFooterLabel:  { fontFamily: fonts.body, color: colors.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  chartFooterValue:  { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 16, marginTop: 2 },

  prList:     { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  prRow:      { flexDirection: 'row', alignItems: 'center', gap: 12, padding: spacing.md },
  prRowBorder:{ borderBottomWidth: 1, borderBottomColor: colors.border },
  prIcon:     { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
  prInfo:     { flex: 1 },
  prName:     { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 14 },
  prDate:     { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 11, marginTop: 1 },
  prValue:    { fontFamily: fonts.headingBlack, color: colors.accent, fontSize: 18, letterSpacing: -0.3 },

  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  photoSlot: { width: '30%', aspectRatio: 1, backgroundColor: `${colors.blue}66`, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  photoMonth:{ fontFamily: fonts.body, color: colors.textMuted, fontSize: 10 },
  photoAdd:  { width: '30%', aspectRatio: 1, backgroundColor: colors.accentSoft, borderRadius: radius.md, borderWidth: 1, borderColor: `${colors.accent}33`, alignItems: 'center', justifyContent: 'center' },
  photoAddText: { fontFamily: fonts.heading, color: colors.accent, fontSize: 28 },
});
