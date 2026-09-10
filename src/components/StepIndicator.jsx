import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export const StepIndicator = ({ currentStep = 1, theme = 'light' }) => {
  const steps = [
    { number: 1, label: '1. Carrito', shortLabel: 'Carrito' },
    { number: 2, label: '2. Pago', shortLabel: 'Pago' },
    { number: 3, label: '3. Resumen y Éxito', shortLabel: 'Éxito' },
  ];

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <View style={styles.stepsRow}>
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep || (currentStep === 3 && step.number === 3);
          const isActive = step.number === currentStep && currentStep !== 3;
          const isPending = step.number > currentStep;

          return (
            <React.Fragment key={step.number}>
              {/* Círculo + Label */}
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.circle,
                    isCompleted && styles.circleCompleted,
                    isActive && styles.circleActive,
                    isPending && (isDark ? styles.circlePendingDark : styles.circlePendingLight),
                  ]}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  ) : (
                    <Text
                      style={[
                        styles.circleText,
                        isActive && styles.circleTextActive,
                        isPending && (isDark ? styles.circleTextPendingDark : styles.circleTextPendingLight),
                      ]}
                    >
                      {step.number}
                    </Text>
                  )}
                </View>

                <Text
                  numberOfLines={1}
                  style={[
                    styles.stepLabel,
                    isDark ? styles.stepLabelDark : styles.stepLabelLight,
                    (isCompleted || isActive) && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
              </View>

              {/* Línea conectora entre círculos */}
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.connectorLine,
                    step.number < currentStep
                      ? styles.connectorLineActive
                      : (isDark ? styles.connectorLineInactiveDark : styles.connectorLineInactiveLight),
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: '100%',
  },
  containerLight: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  containerDark: {
    backgroundColor: '#0F2544',
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    minWidth: 72,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  circleCompleted: {
    backgroundColor: '#0D9488', // Teal vibrante de éxito
  },
  circleActive: {
    backgroundColor: '#0D9488',
    borderWidth: 2,
    borderColor: '#99F6E4',
  },
  circlePendingLight: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  circlePendingDark: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  circleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  circleTextActive: {
    color: '#FFFFFF',
  },
  circleTextPendingLight: {
    color: '#64748B',
  },
  circleTextPendingDark: {
    color: 'rgba(255,255,255,0.6)',
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  stepLabelLight: {
    color: '#94A3B8',
  },
  stepLabelDark: {
    color: 'rgba(255,255,255,0.6)',
  },
  stepLabelActive: {
    color: '#0D9488',
    fontWeight: '700',
  },
  connectorLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
    marginBottom: 20, // Centrado con el círculo
  },
  connectorLineActive: {
    backgroundColor: '#0D9488',
  },
  connectorLineInactiveLight: {
    backgroundColor: '#E2E8F0',
  },
  connectorLineInactiveDark: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});

export default StepIndicator;
