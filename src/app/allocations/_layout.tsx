import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Allocations" }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: "New Allocation",
          presentation: "modal",
          // sheetAllowedDetents: 'fitToContents',
          // headerTitle: "New Allocation",
          // sheetCornerRadius: 100,
          // keyboardHandlingEnabled: true,
          // sheetLargestUndimmedDetentIndex: "last", // Adjust as needed
          // sheetGrabberVisible: true, // Show grabber for better UX
        }}
      />
    </Stack>
  )

}

