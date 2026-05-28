import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { fichas } from '../data/mock';

export default function WorkoutScreen() {
  const [activeFicha, setActiveFicha] = useState('A');
  const [expanded, setExpanded]       = useState(null);
  const [checked, setChecked]         = useState({});

  const ficha = fichas.find(f => f.id === activeFicha);
  const completedSets = Object.values(checked).filter(Boolean).length;

  const toggle = (exId, si) => {
    const key = `${exId}-${si}`;
    setChecked(c => ({ ...c, [key]: !c[key] }));
  };

  const switchFicha = (id) => {
    setActiveFicha(id);
    setExpanded(null);
    setChecked({});
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>Hoje</Text>
          <Text style={styles.title}>Treino</Text>
        </View>

        {/* Fichas selector */}
        <View style={styles.fichasRow}>
          {fichas.map(f => {
            const isActive = activeFicha === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                onPress={() => switchFicha(f.id)}
                style={[styles.fichaBtn, isActive && styles.fichaBtnActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.fichaLetter, isActive && styles.fichaLetterActive]}>
                  {f.id}
                </Text>
                <Text style={[styles.fichaFocus, isActive && styles.fichaFocusActive]}>
                  {f.focus.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Ficha info */}
        <View style={styles.fichaInfo}>
          <View>
            <Text style={styles.fichaName}>{ficha.name}</Text>
            <Text style={styles.fichaMeta}>
              {ficha.focus} · {ficha.exercises.length} exercícios
            </Text>
          </View>
          {completedSets > 0 && (
            <View style={styles.setsCount}>
              <Text style={styles.setsNum}>{completedSets}</Text>
              <Text style={styles.setsLabel}>SÉRIES</Text>
            </View>
          )}
        </View>

        {/* Exercises */}
        <View style={styles.exerciseList}>
          {ficha.exercises.map((ex) => {
            const isOpen    = expanded === ex.id;
            const doneCount = ex.sets.filter((_, si) => checked[`${ex.id}-${si}`]).length;
            const allDone   = doneCount === ex.sets.length;

            return (
              <View
                key={ex.id}
                style={[styles.exCard, allDone && styles.exCardDone]}
              >
                <TouchableOpacity
                  onPress={() => setExpanded(isOpen ? null : ex.id)}
                  style={styles.exHeader}
                  activeOpacity={0.7}
                >
                  <View style={[styles.exIcon, allDone && styles.exIconDone]}>
                    <Text style={{ fontSize: 16 }}>{allDone ? '✓' : '💪'}</Text>
                  </View>
                  <View style={styles.exInfo}>
                    <Text style={[styles.exName, allDone && styles.exNameDone]}>
                      {ex.name}
                    </Text>
                    <Text style={styles.exMeta}>
                      {ex.sets.length} séries
                      {doneCount > 0 ? ` · ${doneCount}/${ex.sets.length} feitas` : ` · ${ex.sets[0].reps} reps`}
                    </Text>
                  </View>
                  <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {isOpen && (
                  <View style={styles.setsContainer}>
                    {/* Table header */}
                    <View style={styles.tableHeader}>
                      <Text style={[styles.tableLabel, { width: 28 }]}>#</Text>
                      <Text style={[styles.tableLabel, { flex: 1 }]}>Reps</Text>
                      <Text style={[styles.tableLabel, { flex: 1 }]}>Carga</Text>
                      <View style={{ width: 36 }} />
                    </View>
                    {ex.sets.map((s, si) => {
                      const done = checked[`${ex.id}-${si}`];
                      return (
                        <View key={si} style={[styles.setRow, done && styles.setRowDone]}>
                          <Text style={[styles.setIndex, { width: 28 }]}>{si + 1}</Text>
                          <View style={[styles.setCell, { flex: 1 }, done && styles.setCellDone]}>
                            <Text style={[styles.setCellVal, done && styles.setCellValDone]}>
                              {s.reps}
                            </Text>
                            <Text style={styles.setCellUnit}> reps</Text>
                          </View>
                          <View style={[styles.setCell, { flex: 1 }, done && styles.setCellDone]}>
                            <Text style={[styles.setCellVal, done && styles.setCellValDone]}>
                              {s.kg}
                            </Text>
                            <Text style={styles.setCellUnit}> kg</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => toggle(ex.id, si)}
                            style={[styles.checkBtn, done && styles.checkBtnDone]}
                            activeOpacity={0.7}
                          >
                            <Text style={{ color: done ? colors.bg : colors.textMuted, fontSize: 14 }}>
                              {done ? '✓' : '○'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Finalizar */}
        {completedSets > 0 && (
          <TouchableOpacity style={styles.finishBtn} activeOpacity={0.85}>
            <Text style={styles.finishText}>
              Finalizar Treino · {completedSets} séries ✓
            </Text>
          </TouchableOpacity>
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

  fichasRow: { flexDirection: 'row', gap: 8, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  fichaBtn: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  fichaBtnActive:   { backgroundColor: colors.accent, borderColor: colors.accent },
  fichaLetter:      { fontFamily: fonts.headingBlack, color: colors.textSecondary, fontSize: 22 },
  fichaLetterActive:{ color: colors.bg },
  fichaFocus:       { fontFamily: fonts.body, color: colors.textMuted, fontSize: 10, textTransform: 'uppercase', marginTop: 3, letterSpacing: 0.5 },
  fichaFocusActive: { color: `${colors.bg}99` },

  fichaInfo: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  fichaName:  { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 17 },
  fichaMeta:  { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  setsCount:  { alignItems: 'flex-end' },
  setsNum:    { fontFamily: fonts.headingBlack, color: colors.accent, fontSize: 24, letterSpacing: -0.5 },
  setsLabel:  { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 9, letterSpacing: 0.8 },

  exerciseList: { paddingHorizontal: spacing.md, marginTop: spacing.sm, gap: 8 },
  exCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  exCardDone:    { borderColor: `${colors.accent}44` },
  exHeader:      { flexDirection: 'row', alignItems: 'center', gap: 12, padding: spacing.md },
  exIcon:        { width: 40, height: 40, borderRadius: 12, backgroundColor: `${colors.blueMid}66`, alignItems: 'center', justifyContent: 'center' },
  exIconDone:    { backgroundColor: colors.accentSoft },
  exInfo:        { flex: 1 },
  exName:        { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 15 },
  exNameDone:    { color: colors.accent },
  exMeta:        { fontFamily: fonts.body, color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  chevron:       { color: colors.textMuted, fontSize: 10 },

  setsContainer: { borderTopWidth: 1, borderTopColor: colors.border, padding: spacing.md },
  tableHeader:   { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  tableLabel:    { fontFamily: fonts.body, color: colors.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  setRow:        { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  setRowDone:    { opacity: 0.5 },
  setIndex:      { fontFamily: fonts.heading, color: colors.textMuted, fontSize: 13, textAlign: 'center' },
  setCell:       { flexDirection: 'row', alignItems: 'baseline', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border },
  setCellDone:   { backgroundColor: colors.accentSoft, borderColor: `${colors.accent}33` },
  setCellVal:    { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 15 },
  setCellValDone:{ color: colors.accent },
  setCellUnit:   { fontFamily: fonts.body, color: colors.textMuted, fontSize: 10 },
  checkBtn:      { width: 36, height: 36, borderRadius: 10, borderWidth: 1.5, borderColor: `${colors.textSecondary}44`, alignItems: 'center', justifyContent: 'center' },
  checkBtnDone:  { backgroundColor: colors.accent, borderColor: colors.accent },

  finishBtn: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  finishText: {
    fontFamily: fonts.heading,
    color: colors.bg,
    fontSize: 16,
    letterSpacing: -0.3,
  },
});
