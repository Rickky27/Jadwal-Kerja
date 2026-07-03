import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Try to use expo-linear-gradient if available; otherwise fall back to a simple View wrapper
// to avoid build/type errors when the package isn't installed.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let LinearGradient: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  LinearGradient = require("expo-linear-gradient").LinearGradient;
} catch (e) {
  // Fallback: simple wrapper that applies the provided style and renders children
  // This preserves layout when expo-linear-gradient is not installed.
  // eslint-disable-next-line react/display-name
  LinearGradient = ({ children, style }: any) => <View style={style}>{children}</View>;
}

type Pekerjaan = {
  id: string | number;
  namaTugas: string;
  poin: number;
  kodeProyek: string;
  pic: string;
};

const pekerjaanList: Pekerjaan[] = [
  {
    id: "1",
    namaTugas: "Rapat Koordinasi Pengembangan Aplikasi",
    poin: 12,
    kodeProyek: "PRJ-001",
    pic: "Budi Saputra",
  },
  {
    id: "2",
    namaTugas: "Uji Coba Modul Autentikasi",
    poin: 8,
    kodeProyek: "PRJ-002",
    pic: "Siti Aminah",
  },
  {
    id: "3",
    namaTugas: "Penyusunan Laporan Kemajuan",
    poin: 5,
    kodeProyek: "PRJ-003",
    pic: "Rina Wijaya",
  },
];

export default function RingkasanScreen() {
  // Menghitung total poin tugas atau jam kerja (sebelumnya SKS)
  const totalPoin = pekerjaanList.reduce((total: number, job: Pekerjaan) => total + job.poin, 0);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Banner utama dengan gradasi Indigo/Navy profesional */}
        <LinearGradient
          colors={["#312E81", "#4F46E5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <MaterialCommunityIcons name="briefcase-account" size={36} color="#FFFFFF" />
          <Text style={styles.bannerTitle}>Kuartal 3 - 2026</Text>
          <Text style={styles.bannerSubtitle}>
            {pekerjaanList.length} Proyek Aktif {"•"} Total {totalPoin} Poin Tugas
          </Text>
        </LinearGradient>

        <Text style={styles.sectionLabel}>Daftar Tugas & Pekerjaan</Text>

        {pekerjaanList.map((job) => (
          <View key={job.id} style={styles.card}>
            <View style={styles.cardHeader}>
              
              {/* Ikon disederhanakan dengan nuansa Indigo */}
              <View style={styles.iconBox}>
                <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#4338CA" />
              </View>
              
              <Text style={styles.cardNama} numberOfLines={2}>{job.namaTugas}</Text>
              
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{job.poin} Pts</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="tag-outline" size={16} color="#9CA3AF" />
              <Text style={styles.infoText}>
                ID Proyek: <Text style={styles.infoValue}>{job.kodeProyek}</Text>
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="account-tie-outline" size={16} color="#9CA3AF" />
              <Text style={styles.infoText}>
                PIC / Klien: <Text style={styles.infoValue}>{job.pic}</Text>
              </Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Background abu-abu bersih
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
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
    marginTop: 4,
    textAlign: "center",
  },
  bannerSubtitle: {
    color: "#E0E7FF", // Biru muda cerah
    fontSize: 14,
    fontWeight: "500",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151", // Teks abu-abu gelap
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB", // Flat design
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
    backgroundColor: "#EEF2FF", // Indigo pucat untuk latar ikon
    alignItems: "center",
    justifyContent: "center",
  },
  cardNama: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  badge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  badgeText: {
    color: "#4338CA",
    fontWeight: "600",
    fontSize: 12,
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