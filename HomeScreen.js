import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { crewEvents, myWorkouts, streakDays, user } from '../data/mock';

export default function HomeScreen() {
  const [confirmed, setConfirmed] = useState(
    Object.fromEntries(crewEvents.map(e => [e.id, e.confirmed]))
  );
  const [rated, setRated] = useState(null);
  const unrated = myWorkouts.find(w => !w.rated);

  const toggleConfirm = (id) =>
    setConfirmed(c => ({ ...c, [id]: !c[id] }));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bom dia</Text>
            <Text style={styles.name}>{user.name} 👋</Text>
          </View>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.initials}</Text>
            </View>
            <View style={styles.avatarDot} />
          </View>
        </View>

        {/* Streak */}
        <View style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <View style={styles.streakIconBox}>
              <Text style={{ fontSize: 22 }}>🔥</Text>
            </View>
            <View>
              <Text style={styles.streakNum}>{user.streak} dias</Text>
              <Text style={styles.streakLabel}>SEQUÊNCIA ATIVA</Text>
            </View>
          </View>
          <View style={styles.streakDots}>
            {streakDays.map((d, i) => (
              <View key={i} style={styles.dotWrap}>
                <View style={[styles.dot, d.active && styles.dotActive]} />
                <Text style={styles.dotLabel}>{d.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Rate prompt */}
        {unrated && rated === null && (
          <View style={styles.rateCard}>
            <View style={styles.rateLeft}>
              <Text style={styles.rateStar}>✦</Text>
              <View>
                <Text style={styles.rateTitle}>Como foi {unrated.title}?</Text>
                <Text style={styles.rateSub}>Avalie a sessão de hoje</Text>
              </View>
            </View>
            <View style={styles.rateBtns}>
              <TouchableOpacity
                onPress={() => setRated('boa')}
                style={[styles.rateBtn, styles.rateBtnGood]}
              >
                <Text style={[styles.rateBtnText, { color: colors.accent }]}>boa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRated('pesada')}
                style={[styles.rateBtn, styles.rateBtnBad]}
              >
                <Text style={[styles.rateBtnText, { color: colors.danger }]}>pesada</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {rated && (
          <View style={styles.ratedConfirm}>
            <Text style={styles.ratedText}>✓ Sessão registrada como <Text style={{ fontFamily: fonts.bodySemiBold }}>{rated}</Text></Text>
          </View>
        )}

        {/* Próximos eventos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximos eventos</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>ver todos →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsRow}
          >
            {crewEvents.map(ev => (
              <View
                key={ev.id}
                style={[
                  styles.eventCard,
                  confirmed[ev.id] && styles.eventCardConfirmed,
                ]}
              >
                <View style={styles.eventTop}>
                  <View style={styles.crewBadge}>
                    <Text style={styles.crewBadgeText}>{ev.crew}</Text>
                  </View>
                  <View style={[
                    styles.confirmDot,
                    confirmed[ev.id] && styles.confirmDotActive,
                  ]} />
                </View>
                <Text style={styles.eventName}>{ev.event}</Text>
                <Text style={styles.eventDist}>📍 {ev.distance}</Text>
                <View style={styles.eventBottom}>
                  <View>
                    <Text style={styles.eventDate}>{ev.date} {ev.day}/{ev.month}</Text>
                    <Text style={styles.eventTime}>{ev.time}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleConfirm(ev.id)}
                    style={[
                      styles.confirmBtn,
                      confirmed[ev.id] && styles.confirmBtnActive,
                    ]}
                  >
                    <Text style={[
                      styles.confirmBtnText,
                      confirmed[ev.id] && styles.confirmBtnTextActive,
                    ]}>
                      {confirmed[ev.id] ? '✓' : '+ ir'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.eventSpots}>{ev.spots} confirmados</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Meus treinos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meus treinos</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>histórico →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.workoutList}>
            {myWorkouts.map((w, i) => (
              <View
                key={w.id}
                style={[
                  styles.workoutRow,
                  i < myWorkouts.length - 1 && styles.workoutRowBorder,
                ]}
              >
                <View style={[
                  styles.workoutIcon,
                  w.type === 'Corrida' ? styles.workoutIconRun : styles.workoutIconGym,
                ]}>
                  <Text style={{ fontSize: 18 }}>
                    {w.type === 'Corrida' ? '🏃' : '🏋️'}
                  </Text>
                </View>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutTitle}>{w.title}</Text>
                  <Text style={styles.workoutMeta}>
                    {w.date} · {w.duration}
                    {w.volume ? ` · ${w.volume}` : ''}
                    {w.distance ? ` · ${w.distance}` : ''}
                  </Text>
                </View>
                {w.rated && (
                  <View style={[
                    styles.ratingBadge,
                    w.rating === 'boa' ? styles.ratingGood : styles.ratingBad,
                  ]}>
                    <Text style={{ fontSize: 13, color: w.rating === 'boa' ? colors.accent : colors.danger }}>
                      {w.rating === 'boa' ? '✦' : '↓'}
                    </Text>
                  </View>
                )}
              </View>
            ))}
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  greeting: {
    fontFamily: fonts.body,
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  name: {
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 32,
    letterSpacing: -1,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: colors.blue,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.heading,
    color: colors.accent,
    fontSize: 13,
  },
  avatarDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.bg,
  },

  streakCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  streakLeft:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  streakIconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
  streakNum:     { fontFamily: fonts.heading, color: colors.accent, fontSize: 20, letterSpacing: -0.5 },
  streakLabel:   { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 9, marginTop: 2, letterSpacing: 0.8 },
  streakDots:    { flexDirection: 'row', gap: 6 },
  dotWrap:       { alignItems: 'center', gap: 4 },
  dot:           { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)' },
  dotActive:     { backgroundColor: colors.accent, shadowColor: colors.accent, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 6, elevation: 4 },
  dotLabel:      { fontFamily: fonts.body, color: colors.textMuted, fontSize: 8, textTransform: 'uppercase' },

  rateCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: `${colors.accent}22`,
  },
  rateLeft:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rateStar:       { color: colors.accent, fontSize: 18 },
  rateTitle:      { fontFamily: fonts.bodySemiBold, color: colors.textPrimary, fontSize: 13 },
  rateSub:        { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 11, marginTop: 1 },
  rateBtns:       { flexDirection: 'row', gap: 6 },
  rateBtn:        { borderRadius: radius.sm, paddingVertical: 6, paddingHorizontal: 12 },
  rateBtnGood:    { backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: `${colors.accent}44` },
  rateBtnBad:     { backgroundColor: 'rgba(255,92,92,0.1)', borderWidth: 1, borderColor: 'rgba(255,92,92,0.3)' },
  rateBtnText:    { fontFamily: fonts.bodySemiBold, fontSize: 12 },
  ratedConfirm:   { marginHorizontal: spacing.md, marginTop: spacing.sm, backgroundColor: colors.accentSoft, borderRadius: radius.lg, padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: `${colors.accent}22` },
  ratedText:      { fontFamily: fonts.body, color: colors.accent, fontSize: 13 },

  section:       { marginTop: spacing.lg, paddingHorizontal: spacing.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: spacing.sm },
  sectionTitle:  { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 18, letterSpacing: -0.3 },
  sectionLink:   { fontFamily: fonts.bodyMedium, color: colors.accent, fontSize: 12, opacity: 0.8 },

  eventsRow: { paddingLeft: 0, gap: 10 },
  eventCard: {
    width: 165,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventCardConfirmed: { borderColor: `${colors.accent}44` },
  eventTop:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  crewBadge:          { backgroundColor: colors.accentSoft, borderRadius: 6, paddingVertical: 3, paddingHorizontal: 7 },
  crewBadgeText:      { fontFamily: fonts.bodySemiBold, color: colors.accent, fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5 },
  confirmDot:         { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.1)' },
  confirmDotActive:   { backgroundColor: colors.accent, shadowColor: colors.accent, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 6 },
  eventName:          { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 14, letterSpacing: -0.3, marginBottom: 4, lineHeight: 18 },
  eventDist:          { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 11, marginBottom: 12, opacity: 0.7 },
  eventBottom:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  eventDate:          { fontFamily: fonts.body, color: colors.textMuted, fontSize: 10 },
  eventTime:          { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 20, letterSpacing: -0.5, marginTop: 2 },
  confirmBtn:         { borderRadius: radius.sm, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderColor: `${colors.textSecondary}44` },
  confirmBtnActive:   { backgroundColor: colors.accent, borderColor: colors.accent },
  confirmBtnText:     { fontFamily: fonts.bodySemiBold, color: colors.textSecondary, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  confirmBtnTextActive: { color: colors.bg },
  eventSpots:         { fontFamily: fonts.body, color: colors.textMuted, fontSize: 10, marginTop: 8 },

  workoutList:       { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  workoutRow:        { flexDirection: 'row', alignItems: 'center', gap: 12, padding: spacing.md },
  workoutRowBorder:  { borderBottomWidth: 1, borderBottomColor: colors.border },
  workoutIcon:       { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  workoutIconRun:    { backgroundColor: `${colors.blue}88` },
  workoutIconGym:    { backgroundColor: colors.accentSoft },
  workoutInfo:       { flex: 1 },
  workoutTitle:      { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 14, letterSpacing: -0.2 },
  workoutMeta:       { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  ratingBadge:       { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  ratingGood:        { backgroundColor: colors.accentSoft },
  ratingBad:         { backgroundColor: 'rgba(255,92,92,0.1)' },
});
