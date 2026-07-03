import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Try to load data from ../data/data if it exists, otherwise use a local fallback.
let importedData: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  importedData = require("../data/data");
} catch (e) {
  importedData = null;
}

export interface Pertemuan {
  id: string;
  namaAgenda: string;
  pembahasan: string;
  tanggal: string;
  kategori?: string;
}

const pertemuanList: Pertemuan[] =
  (importedData && importedData.pertemuanList) || [
    {
      id: "1",
      namaAgenda: "Contoh Rapat",
      pembahasan: "Pembahasan contoh untuk menampilkan daftar agenda.",
      tanggal: "2026-07-03",
      kategori: "Umum",
    },
  ];

function PertemuanItem({ item }: { item: Pertemuan }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {/* Ikon flat disederhanakan tanpa gradasi */}
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name="presentation" size={20} color="#4338CA" />
        </View>
        
        <Text style={styles.cardNama} numberOfLines={1}>{item.namaAgenda}</Text>
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.kategori}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="text-box-outline" size={16} color="#9CA3AF" />
        <Text style={styles.infoValue} numberOfLines={2}>{item.pembahasan}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="calendar-clock-outline" size={16} color="#9CA3AF" />
        <Text style={styles.infoText}>{item.tanggal}</Text>
      </View>
    </View>
  );
}

function ListHeader() {
  return (
    <View style={styles.banner}>
      <MaterialCommunityIcons name="account-group" size={36} color="#FFFFFF" />
      <Text style={styles.bannerTitle}>Agenda Pertemuan</Text>
      <Text style={styles.bannerSubtitle}>
        Total {pertemuanList.length} agenda terdaftar
      </Text>
    </View>
  );
}

function ListEmpty() {
  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="calendar-remove-outline" size={64} color="#C7D2FE" />
      <Text style={styles.emptyTitle}>Belum Ada Agenda</Text>
      <Text style={styles.emptySubtitle}>Data agenda rapat akan muncul di sini</Text>
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export default function PertemuanScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <FlatList
        data={pertemuanList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PertemuanItem item={item} />}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={<ListHeader />}
        ListEmptyComponent={<ListEmpty />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Background bersih (abu-abu sangat terang)
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
    backgroundColor: "#4F46E5",
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB", // Desain flat: pinggiran border (tanpa shadow berlebih)
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
    backgroundColor: "#EEF2FF", // Warna solid biru muda (Indigo pucat)
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
    alignItems: "flex-start", // Agar teks panjang terlihat rapi jika turun ke baris baru
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#6B7280",
    flex: 1,
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
    lineHeight: 18,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 80,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4B5563",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
  },
});