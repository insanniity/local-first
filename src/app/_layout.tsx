import { Tabs } from "expo-router";
import { FolderTreeIcon, LayoutDashboardIcon, WalletIcon } from "lucide-react-native";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => <LayoutDashboardIcon size={size} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="allocations"
        options={{
          title: "Allocations",
          tabBarIcon: ({ size, color }) => <FolderTreeIcon size={size} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          tabBarIcon: ({ size, color }) => <WalletIcon size={size} color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  )
}

