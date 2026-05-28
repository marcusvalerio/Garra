import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { favoriteCrews, exploreCrews, crewEvents } from '../data/mock';

function FavoriteCrewCard({ crew }) {
  return (
    <View style={styles.favCard}>
      <View style={styles.favTop}>
        <View style={styles.favInitials}>
          <Text style={styles.favInitialsText}>
            {crew.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </Text>
        </View>
        {!crew.private && (
          <View style={styles.favPublicBadge}>
            <Text style={styles.favPublicText}>público</Text>
          </View>
        )}
      </View>
      <Text style={styles.favName}>{crew.name}</Text>
      <Text style={styles.favTag}>{crew.tag}</Text>
      <View style={styles.favFooter}>
        <Text style={styles.favMembers}>{crew.members} membros</Text>
        <Text style={styles.favNext}>{crew.nextRun}</Text>
      </View>
    </View>
  );
}

function AgendaEvent({ ev }) {
  const [confirmed, setConfirmed] = useState(ev.confirmed);
  return (
    <View style={[styles.agendaCard, confirmed && styles.agendaCardConfirmed]}>
      <View style={styles.agendaLeft}>
        <View style={styles.agendaDateBox}>
          <Text style={styles.agendaDay}>{ev.day}</Text>
          <Text style={styles.agendaMonth}>{ev.date}</Text>
        </View>
        <View style={styles.agendaInfo}>
          <Text style={styles.agendaCrew}>{ev.crew}</Text>
          <Text style={styles.agendaName}>{ev.event}</Text>
          <Text style={styles.agendaMeta}>📍 {ev.distance} · {ev.time}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setConfirmed(c => !c)}
        style={[styles.agendaBtn, confirmed && styles.agendaBtnConfirmed]}
        activeOpacity={0.7}
      >
        <Text style={[styles.agendaBtnText, confirmed && styles.agendaBtnTextConfirmed]}>
          {confirmed ? '✓' : '+ ir'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ExploreCard({ crew }) {
  const [joined, setJoined] = useState(false);
  return (
    <View style={styles.exploreCard}>
      <View style={styles.exploreTop}>
        <View style={styles.exploreInitials}>
          <Text style={styles.exploreInitialsText}>
            {crew.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </Text>
        </View>
        <View style={{ flex: 1, paddingLeft: 12 }}>
          <View style={styles.exploreNameRow}>
            <Text style={styles.exploreName}>{crew.name}</Text>
            {crew.hot && <Text style={styles.hotBadge}>🔥</Text>}
          </View>
          <Text style={styles.exploreTag}>{crew.tag}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setJoined(j => !j)}
          style={[styles.joinBtn, joined && styles.joinBtnActive]}
          activeOpacity={0.7}
        >
          <Text style={[styles.joinBtnText, joined && styles.joinBtnTextActive]}>
            {joined ? '✓' : 'entrar'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.exploreDesc}>{crew.description}</Text>
      <View style={styles.exploreFooter}>
        <Text style={styles.exploreMembers}>{crew.members} membros</Text>
        <Text style={styles.exploreDot}>·</Text>
        <Text style={styles.exploreNext}>{crew.nextRun}</Text>
        <Text style={styles.exploreDot}>·</Text>
        <Text style={styles.exploreDist}>{crew.distance}</Text>
      </View>
    </View>
  );
}

export default function CrewScreen() {
  const [tab, setTab] = useState('agenda');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>Comunidade</Text>
          <Text style={styles.title}>Crew</Text>
        </View>

        {/* Tab switcher */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            onPress={() => setTab('agenda')}
            style={[styles.tabBtn, tab === 'agenda' && styles.tabBtnActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, tab === 'agenda' && styles.tabTextActive]}>
              Agenda
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab('explorar')}
            style={[styles.tabBtn, tab === 'explorar' && styles.tabBtnActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, tab === 'explorar' && styles.tabTextActive]}>
              Explorar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Favoritas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minhas Crews</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.favRow}
          >
            {favoriteCrews.map(c => (
              <FavoriteCrewCard key={c.id} crew={c} />
            ))}
            <TouchableOpacity style={styles.addCrewCard} activeOpacity={0.7}>
              <Text style={styles.addCrewPlus}>+</Text>
              <Text style={styles.addCrewLabel}>Entrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Tab content */}
        {tab === 'agenda' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Próximas corridas</Text>
            <View style={styles.agendaList}>
              {crewEvents.map(ev => (
                <AgendaEvent key={ev.id} ev={ev} />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perto de você</Text>
            <View style={styles.exploreList}>
              {exploreCrews.map(c => (
                <ExploreCard key={c.id} crew={c} />
              ))}
            </View>
          </View>
        )}

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

  tabRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.sm,
  },
  tabBtnActive: { backgroundColor: colors.accent },
  tabText:      { fontFamily: fonts.bodySemiBold, color: colors.textSecondary, fontSize: 13 },
  tabTextActive:{ color: colors.bg },

  section:      { marginTop: spacing.lg, paddingHorizontal: spacing.lg },
  sectionTitle: { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 16, letterSpacing: -0.3, marginBottom: spacing.sm },

  favRow: { gap: 10, paddingRight: 4 },
  favCard: {
    width: 155,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  favTop:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  favInitials:     { width: 40, height: 40, borderRadius: 13, backgroundColor: colors.blue, borderWidth: 1.5, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  favInitialsText: { fontFamily: fonts.heading, color: colors.accent, fontSize: 13 },
  favPublicBadge:  { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 6, paddingVertical: 3, paddingHorizontal: 6, borderWidth: 1, borderColor: colors.border },
  favPublicText:   { fontFamily: fonts.body, color: colors.textMuted, fontSize: 9, textTransform: 'uppercase' },
  favName:         { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 15, letterSpacing: -0.3, marginBottom: 3 },
  favTag:          { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 11, marginBottom: 12 },
  favFooter:       { flexDirection: 'row', justifyContent: 'space-between' },
  favMembers:      { fontFamily: fonts.body, color: colors.textMuted, fontSize: 10 },
  favNext:         { fontFamily: fonts.bodySemiBold, color: colors.accent, fontSize: 10 },
  addCrewCard:     { width: 80, backgroundColor: colors.accentSoft, borderRadius: radius.lg, borderWidth: 1, borderColor: `${colors.accent}33`, alignItems: 'center', justifyContent: 'center', gap: 4 },
  addCrewPlus:     { fontFamily: fonts.heading, color: colors.accent, fontSize: 28 },
  addCrewLabel:    { fontFamily: fonts.body, color: colors.accent, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },

  agendaList:          { gap: 8 },
  agendaCard:          { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border },
  agendaCardConfirmed: { borderColor: `${colors.accent}44` },
  agendaLeft:          { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  agendaDateBox:       { width: 44, height: 44, borderRadius: 13, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
  agendaDay:           { fontFamily: fonts.headingBlack, color: colors.accent, fontSize: 16, lineHeight: 18 },
  agendaMonth:         { fontFamily: fonts.body, color: colors.accent, fontSize: 9, textTransform: 'uppercase', opacity: 0.7 },
  agendaInfo:          { flex: 1 },
  agendaCrew:          { fontFamily: fonts.bodySemiBold, color: colors.accent, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  agendaName:          { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 14, letterSpacing: -0.2 },
  agendaMeta:          { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  agendaBtn:           { borderRadius: radius.sm, paddingVertical: 7, paddingHorizontal: 12, borderWidth: 1, borderColor: `${colors.textSecondary}44` },
  agendaBtnConfirmed:  { backgroundColor: colors.accent, borderColor: colors.accent },
  agendaBtnText:       { fontFamily: fonts.bodySemiBold, color: colors.textSecondary, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.4 },
  agendaBtnTextConfirmed: { color: colors.bg },

  exploreList:         { gap: 10 },
  exploreCard:         { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  exploreTop:          { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  exploreInitials:     { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  exploreInitialsText: { fontFamily: fonts.heading, color: colors.textSecondary, fontSize: 13 },
  exploreNameRow:      { flexDirection: 'row', alignItems: 'center', gap: 6 },
  exploreName:         { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 15, letterSpacing: -0.3 },
  hotBadge:            { fontSize: 14 },
  exploreTag:          { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  joinBtn:             { borderRadius: radius.sm, paddingVertical: 7, paddingHorizontal: 12, borderWidth: 1, borderColor: `${colors.textSecondary}44` },
  joinBtnActive:       { backgroundColor: colors.accent, borderColor: colors.accent },
  joinBtnText:         { fontFamily: fonts.bodySemiBold, color: colors.textSecondary, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.4 },
  joinBtnTextActive:   { color: colors.bg },
  exploreDesc:         { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 10 },
  exploreFooter:       { flexDirection: 'row', alignItems: 'center', gap: 6 },
  exploreMembers:      { fontFamily: fonts.body, color: colors.textMuted, fontSize: 11 },
  exploreDot:          { color: colors.textMuted, fontSize: 11 },
  exploreNext:         { fontFamily: fonts.bodySemiBold, color: colors.accent, fontSize: 11 },
  exploreDist:         { fontFamily: fonts.body, color: colors.textMuted, fontSize: 11 },
});
