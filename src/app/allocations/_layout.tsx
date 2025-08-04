import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Allocations" }} />
      <Stack.Screen name="new" options={{ title: "New Allocation" }} />
    </Stack>
  )

}

