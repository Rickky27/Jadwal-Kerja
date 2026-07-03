import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Fallback for environments where expo-linear-gradient is not installed.
// If expo-linear-gradient is available in the project, replace this
// simple fallback with: import { LinearGradient } from 'expo-linear-gradient';
const LinearGradient: React.FC<any> = ({ children, style, colors, start, end }) => {
  // Use a single solid background color as a graceful fallback.
  const fallbackStyle = Array.isArray(colors) && colors.length > 0 ? { backgroundColor: colors[colors.length - 1] } : { backgroundColor: "#4F46E5" };
  return <View style={[fallbackStyle, style]}>{children}</View>;
 
};

type JadwalItem = {
  id: string;
  namaTugas: string;
  prioritas: string;
  deadline: string;
};

const jadwalPerHari: { hari: string; data: JadwalItem[] }[] = [
  {
    hari: "Senin",
    data: [
      {
        id: "senin-1",
        namaTugas: "Review catatan kuliah",
        prioritas: "Tinggi",
        deadline: "18:00",
      },
      {
        id: "senin-2",
        namaTugas: "Kerjakan latihan pemrograman",
        prioritas: "Sedang",
        deadline: "20:00",
      },
    ],
  },
  {
    hari: "Selasa",
    data: [
      {
        id: "selasa-1",
        namaTugas: "Persiapan presentasi",
        prioritas: "Tinggi",
        deadline: "16:00",
      },
    ],
  },
  {
    hari: "Rabu",
    data: [
      {
        id: "rabu-1",
        namaTugas: "Belajar materi baru",
        prioritas: "Sedang",
        deadline: "19:00",
      },
    ],
  },
  {
    hari: "Kamis",
    data: [
      {
        id: "kamis-1",
        namaTugas: "Selesaikan tugas kelompok",
        prioritas: "Tinggi",
        deadline: "21:00",
      },
    ],
  },
  {
    hari: "Jumat",
    data: [
      {
        id: "jumat-1",
        namaTugas: "Review minggu ini",
        prioritas: "Rendah",
        deadline: "17:00",
      },
    ],
  },
];

// Warna disederhanakan menggunakan tema biru tua profesional (Corporate/Slate)
const HARI_COLOR: Record<string, string> = {
  Senin:  "#1E293B",
  Selasa: "#334155",
  Rabu:   "#475569",
  Kamis:  "#334155",
  Jumat:  "#1E293B",
};

function SectionHeader({ hari }: { hari: string }) {
  const bgColor = HARI_COLOR[hari] ?? "#1E293B";
  return (
    <View style={[styles.sectionHeader, { backgroundColor: bgColor }]}>
      <MaterialCommunityIcons name="calendar-check-outline" size={18} color="#FFFFFF" />
      <Text style={styles.sectionHeaderText}>{hari}</Text>
    </View>
  );
}

function TugasCard({ item }: { item: JadwalItem }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {/* Ikon checklist tanpa gradasi (Flat Design) */}
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={20} color="#4338CA" />
        </View>
        <Text style={styles.cardNama}>{item.namaTugas}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#9CA3AF" />
        <Text style={styles.infoText}>
          Prioritas: <Text style={styles.infoValue}>{item.prioritas}</Text>
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="timer-outline" size={16} color="#9CA3AF" />
        <Text style={styles.infoText}>
          Deadline: <Text style={styles.infoValue}>{item.deadline}</Text>
        </Text>
      </View>
    </View>
  );
}

export default function JadwalScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <SectionList
        sections={jadwalPerHari}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TugasCard item={item} />}
        renderSectionHeader={({ section }) => (
          <SectionHeader hari={section.hari} />
        )}
        ListHeaderComponent={
          <LinearGradient
            colors={["#312E81", "#4F46E5"]} // Gradasi Indigo/Navy profesional
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <MaterialCommunityIcons name="format-list-checks" size={36} color="#FFFFFF" />
            <Text style={styles.bannerTitle}>Daftar Tugas Harian</Text>
            <Text style={styles.bannerSubtitle}>Minggu Ini • Berdasarkan Hari</Text>
          </LinearGradient>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Background abu-abu sangat terang dan bersih
  },
  listContent: {
    padding: 16,
    paddingBottom: 24, // Disesuaikan agar proporsional
  },
  banner: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  bannerSubtitle: {
    color: "#E0E7FF", // Biru muda cerah
    fontSize: 14,
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB", // Menggunakan border tipis sebagai ganti shadow
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#EEF2FF", // Background ikon berwarna Indigo solid/polos
    alignItems: "center",
    justifyContent: "center",
  },
  cardNama: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#6B7280",
  },
  infoValue: {
    color: "#374151",
    fontWeight: "500",
  },
});