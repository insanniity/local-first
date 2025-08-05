import { theme } from "@/styles/theme";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTitleStyle: {
          ...theme.typography.h3,
          color: theme.colors.text.primary,
        },
        headerTintColor: theme.colors.primary,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  )
}

