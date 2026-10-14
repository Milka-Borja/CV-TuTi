// app/experience.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { z } from "zod";
import { useCVContext } from "../context/CVContext";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { Experience } from "../types/cv.types";
import { DateField } from "../components/DateField"; 
import { TuTiTheme } from "../constants/theme";

// Esquema de validación con Zod y validación personalizada de fechas
const experienceSchema = z.object({
  company: z.string().min(2, "El nombre de la empresa es obligatorio"),
  position: z.string().min(2, "El cargo o posición es obligatorio"),
  startDate: z.string().min(1, "La fecha de inicio es obligatoria"),
  endDate: z.string().optional(),
  description: z.string().optional(),
}).refine((data) => {
  // Si existe fecha de fin y fecha de inicio, validamos que inicio no sea posterior a fin
  if (data.startDate && data.endDate && data.endDate.trim() !== "") {
    return new Date(data.startDate) <= new Date(data.endDate);
  }
  return true;
}, {
  message: "La fecha de inicio no puede ser posterior a la fecha de fin",
  path: ["startDate"], // Muestra el error en la fecha de inicio
});

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();

  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validación en tiempo real mientras el usuario interactúa
  useEffect(() => {
    const result = experienceSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }, [formData]);

  const handleAdd = () => {
    const result = experienceSchema.safeParse(formData);
    if (!result.success) {
      Alert.alert(
        "Error de validación",
        "Por favor completa correctamente los campos obligatorios y verifica que las fechas sean coherentes."
      );
      return;
    }

    const newExperience: Experience = {
      id: Date.now().toString(),
      ...formData,
    };

    addExperience(newExperience);

    // Limpiar formulario
    setFormData({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setErrors({});

    Alert.alert("Éxito", "Experiencia agregada correctamente");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Agregar Nueva Experiencia</Text>

        <InputField
          label="Empresa *"
          placeholder="Nombre de la empresa"
          value={formData.company}
          onChangeText={(text) => setFormData({ ...formData, company: text })}
          error={errors.company}
        />

        <InputField
          label="Cargo *"
          placeholder="Tu posición"
          value={formData.position}
          onChangeText={(text) => setFormData({ ...formData, position: text })}
          error={errors.position}
        />

        <DateField
          label="Fecha de Inicio *"
          value={formData.startDate}
          onChangeDate={(date) => setFormData({ ...formData, startDate: date })}
          error={errors.startDate}
        />

        <DateField
          label="Fecha de Fin"
          value={formData.endDate}
          onChangeDate={(date) => setFormData({ ...formData, endDate: date })}
          error={errors.endDate}
        />

        <InputField
          label="Descripción"
          placeholder="Describe tus responsabilidades y logros..."
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: "top" }}
          error={errors.description}
        />

        <NavigationButton title="Agregar Experiencia" onPress={handleAdd} />

        {cvData.experiences.length > 0 && (
          <>
            <Text style={styles.listTitle}>Experiencias Agregadas</Text>
            {cvData.experiences.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{exp.position}</Text>
                  <Text style={styles.cardSubtitle}>{exp.company}</Text>
                  <Text style={styles.cardDate}>
                    {exp.startDate} - {exp.endDate || "Actual"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(exp.id)}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        <NavigationButton
          title="Volver"
          onPress={() => router.back()}
          variant="secondary"
          style={{ marginTop: 16 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TuTiTheme.background,
  },
  content: {
    padding: 20,
    margin: 16,
    backgroundColor: TuTiTheme.card,
    borderTopWidth: 4,
    borderTopColor: TuTiTheme.secondary,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: TuTiTheme.textMain,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: TuTiTheme.primary,
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: TuTiTheme.card,
    borderWidth: 1,
    borderColor: TuTiTheme.border,
    borderLeftWidth: 3,
    borderLeftColor: TuTiTheme.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: TuTiTheme.textMain,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: TuTiTheme.textMuted,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: TuTiTheme.textMuted,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: TuTiTheme.error,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: TuTiTheme.card,
    fontSize: 18,
    fontWeight: "bold",
  },
});