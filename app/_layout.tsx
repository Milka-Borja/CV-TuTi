import { Stack } from "expo-router";
import { CVProvider } from "../context/CVContext";
import { TuTiTheme } from "../constants/theme";

export default function RootLayout(){
  return(
    <CVProvider>
      <Stack screenOptions={{
        headerStyle:{
          backgroundColor: TuTiTheme.primary,
        },
        headerTintColor: TuTiTheme.card,
        headerTitleStyle:{
          fontWeight:"800",
        },
      }}
      >
        <Stack.Screen 
        name="index"
        options={{
          title:"Crear CV",
          headerShown:true,
        }}
        />
        <Stack.Screen
        name="personal-info"
        options={{
          title:"Informacion Personal",
        }} 
        />

        <Stack.Screen 
        name="experience"
        options={{
          title:"Experiencia Laboral",
        }}
        />
        <Stack.Screen 
        name="education"
        options={{
          title:"Educación",
        }}
        />
        <Stack.Screen 
        name="preview"
        options={{
          title:"Vista Previa",
          presentation:"modal",
        }}
        />
      </Stack>
    </CVProvider>
  );
}