import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Accounts" }} />
      <Stack.Screen name="new" options={{ title: "New Account", presentation: "fullScreenModal" }} />
    </Stack>
  )

}

