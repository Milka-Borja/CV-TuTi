// app/personal-info.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { z } from "zod";

import { NavigationButton } from "../components/NavigationButton";
import { InputField } from "../components/InputField";
import { PersonalInfo } from "../types/cv.types";
import { useCVContext } from "../context/CVContext";
import { TuTiTheme } from "../constants/theme";

// Esquema de validación con Zod para asegurar datos correctos en tiempo de ejecución
const personalInfoSchema = z.object({
  fullName: z.string().min(3, "El nombre completo es requerido (mínimo 3 caracteres)"),
  email: z.string().email("Ingrese un correo electrónico válido"),
  phone: z.string().regex(/^[0-9+]*$/, "Ingrese un número de teléfono válido (solo números y '+')"),
  location: z.string().min(2, "La ubicación es requerida"),
  summary: z.string().min(10, "El resumen profesional debe tener al menos 10 caracteres"),
});

export default function PersonalInfoScreen(){
    const router = useRouter();
    const { cvData, updatePersonalInfo } = useCVContext();

    const [formData, setFormData] = useState<PersonalInfo>(cvData.personalInfo);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(()=>{
        setFormData(cvData.personalInfo);
    }, [cvData.personalInfo]);

    // Validación en tiempo real mientras el usuario escribe
    useEffect(() => {
        const result = personalInfoSchema.safeParse(formData);
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

    const handleSave = () => {
        const result = personalInfoSchema.safeParse(formData);
        if (!result.success){
            Alert.alert("Error de validación", "Por favor corrige los campos marcados antes de guardar.");
            return;
        }

        updatePersonalInfo(formData);
        Alert.alert("Éxito", "Información guardada correctamente",[
            {text:"OK", onPress:()=> router.back()},
        ]);
    };

    return(
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <InputField
                    label="Nombre Completo *"
                    placeholder="Juan Perez"
                    value={formData.fullName}
                    onChangeText={(text)=>setFormData({...formData, fullName: text})}
                    error={errors.fullName}
                />
                <InputField
                    label="Email *"
                    placeholder="juan@email.com"
                    value={formData.email}
                    onChangeText={(text)=>setFormData({...formData, email: text})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                />
                <InputField
                    label="Telefono"
                    placeholder="+593 99 999 9999"
                    value={formData.phone}
                    onChangeText={(text)=>setFormData({...formData, phone: text})}
                    keyboardType="phone-pad"
                    error={errors.phone}
                />
                <InputField
                    label="Ubicacion"
                    placeholder="Quito, Ecuador"
                    value={formData.location}
                    onChangeText={(text)=>setFormData({...formData, location: text})}
                    error={errors.location}
                />
                <InputField
                    label="Resumen Profesional"
                    placeholder="Describe brevemente tu perfil profesional..."
                    value={formData.summary}
                    onChangeText={(text)=>setFormData({...formData, summary: text})}
                    multiline
                    numberOfLines={4}
                    style={{height: 100, textAlignVertical: "top"}}
                    error={errors.summary}
                />
                <NavigationButton title="Guardar Informacion" onPress={handleSave}/>
                <NavigationButton
                    title="Cancelar"
                    onPress={()=>router.back()}
                    variant="secondary"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: TuTiTheme.background,
    },
    content:{
        padding: 20,
        margin: 16,
        backgroundColor: TuTiTheme.card,
        borderTopWidth: 4,
        borderTopColor: TuTiTheme.secondary,
        borderRadius: 8,
    },
});