import { Tabs } from "expo-router";
import { FolderTreeIcon, LayoutDashboardIcon, WalletIcon } from "lucide-react-native";
import { theme } from "../styles/theme";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border.light,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          ...theme.shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border.light,
          borderBottomWidth: 1,
          ...theme.shadows.sm,
        },
        headerTitleStyle: {
          ...theme.typography.h3,
          color: theme.colors.text.primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => <LayoutDashboardIcon size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="allocations"
        options={{
          title: "Alocações",
          tabBarIcon: ({ size, color }) => <FolderTreeIcon size={size} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Contas",
          tabBarIcon: ({ size, color }) => <WalletIcon size={size} color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  )
}

