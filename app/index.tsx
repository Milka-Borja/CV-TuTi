import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCVContext } from "../context/CVContext";
import { TuTiTheme } from "../constants/theme";

export default function HomeScreen() {
  const router = useRouter();
  const { cvData } = useCVContext();

  const isPersonalInfoComplete =
    cvData.personalInfo.fullName && cvData.personalInfo.email;
  const hasExperience = cvData.experiences.length > 0;
  const hasEducation = cvData.education.length > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.accent} />
        <Text style={styles.title}>Crea tu CV Profesional</Text>
        <Text style={styles.subtitle}>Completa tus datos y destaca tu experiencia.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Información Personal</Text>
        <Text style={[styles.status, isPersonalInfoComplete && styles.statusComplete]}>
          {isPersonalInfoComplete ? "✓ Completado" : "Pendiente"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/personal-info")}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Experiencia</Text>
        <Text style={[styles.status, hasExperience && styles.statusComplete]}>
          {hasExperience
            ? `✓ ${cvData.experiences.length} agregada(s)`
            : "Pendiente"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/experience")}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Educación</Text>
        <Text style={[styles.status, hasEducation && styles.statusComplete]}>
          {hasEducation
            ? `✓ ${cvData.education.length} agregada(s)`
            : "Pendiente"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/education")}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/preview")}
        >
          <Text style={styles.buttonText}>Ver Vista Previa del CV</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: TuTiTheme.background,
  },
  hero: {
    backgroundColor: TuTiTheme.primary,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  accent: {
    height: 5,
    width: 56,
    backgroundColor: TuTiTheme.secondary,
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: TuTiTheme.card,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: TuTiTheme.card,
  },
  section: {
    backgroundColor: TuTiTheme.card,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: TuTiTheme.border,
    borderLeftWidth: 4,
    borderLeftColor: TuTiTheme.secondary,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TuTiTheme.textMain,
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: TuTiTheme.textMuted,
    marginBottom: 12,
  },
  statusComplete: {
    color: TuTiTheme.success,
    fontWeight: "600",
  },
  button: {
    backgroundColor: TuTiTheme.primary,
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: TuTiTheme.secondary,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
});
