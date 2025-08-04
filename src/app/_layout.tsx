import { Tabs } from "expo-router";
import { LayoutDashboardIcon, WalletIcon } from "lucide-react-native";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => <LayoutDashboardIcon size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          tabBarIcon: ({ size, color }) => <WalletIcon size={size} color={color} />
        }}
      />
    </Tabs>
  )
}

