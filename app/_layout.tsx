import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4F46E5", // Warna Indigo (Active) selaras dengan tema kerja
        tabBarInactiveTintColor: "#9CA3AF", // Warna Abu-abu (Inactive)
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          // Layout tetap simpel tanpa height dan padding manual
        },
        headerStyle: {
          backgroundColor: "#312E81", // Warna Navy/Indigo gelap pada Header agar terlihat profesional
          elevation: 0, // Menghilangkan bayangan header di Android agar lebih datar/simpel
          shadowOpacity: 0, // Menghilangkan bayangan header di iOS
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 16,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard Pekerjaan", // Judul header disesuaikan
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            // Ikon diganti dari buku menjadi dashboard
            <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="pertemuan"
        options={{
          title: "Agenda Pertemuan",
          tabBarLabel: "Agenda",
          tabBarIcon: ({ color, size }) => (
            // Ikon diganti dari list menjadi grup/rapat
            <MaterialCommunityIcons name="account-group-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="jadwal"
        options={{
          title: "Jadwal Kerja Harian",
          tabBarLabel: "Jadwal",
          tabBarIcon: ({ color, size }) => (
            // Ikon kalender kerja
            <MaterialCommunityIcons name="calendar-clock-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}