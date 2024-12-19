import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from '../components/ui/Button';
import { colors } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Coat_of_arms_of_Ghana.svg' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Ghana Report</Text>
        <Text style={styles.subtitle}>
          A secure platform for reporting workplace misconduct, fraud, and ethical concerns.
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Submit a Report"
            onPress={() => navigation.navigate('ReportForm')}
          />
          <Button
            title="Check Status"
            variant="outline"
            onPress={() => navigation.navigate('ReportStatus')}
            style={styles.secondaryButton}
          />
        </View>
      </View>

      <View style={styles.features}>
        <Text style={styles.sectionTitle}>Why Choose Our Platform?</Text>
        {FEATURES.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const FEATURES = [
  {
    title: 'Anonymous Reporting',
    description: 'Submit reports without revealing your identity. Your privacy is our top priority.'
  },
  {
    title: 'Secure Platform',
    description: 'End-to-end encryption and secure data handling to protect sensitive information.'
  },
  {
    title: 'Real-time Updates',
    description: 'Track the status of your report and receive updates on investigations.'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
    marginTop: 20,
  },
  secondaryButton: {
    marginTop: 10,
  },
  features: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  featureCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});