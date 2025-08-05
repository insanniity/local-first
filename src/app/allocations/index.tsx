import Button from "@/components/button";
import database, { allocationsCollection } from "@/db";
import Allocation from "@/model/Allocation";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { useRouter } from "expo-router";
import { TrashIcon } from "lucide-react-native";
import moment from "moment";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

function AllocationsScreen({ allocations }: { allocations: Allocation[] }) {
    const router = useRouter();

    return (
        <View
            style={styles.container}
        >
            <FlatList
                data={allocations}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text>Data</Text>
                            <Text>Income</Text>
                            <Text>Action</Text>
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <AllocationCard allocation={item} />
                )}
                keyExtractor={(item, index) => `index-${index}`}
                contentContainerStyle={{ padding: 20 }}
            />
            <View style={{ padding: 20 }}>
                <Button onPress={() => router.push('/allocations/new')} label="Adicionar" />
            </View>
        </View>
    )
}

function AllocationCard({ allocation }: { allocation: Allocation }) {

    async function handleDelete() {
        await database.write(async () => {
            await allocation.markAsDeleted();
        });
    }

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text>{moment(allocation.createdAt).format('DD/MM/YYYY')}</Text>
                <View
                    style={styles.cardContent}
                >
                    <Text>R$ </Text>
                    <Text>{allocation.income}</Text>
                </View>
                <Pressable style={styles.deleteButton} onPress={handleDelete}>
                    <TrashIcon size={20} color="white" />
                </Pressable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteButton: {
        padding: 5,
        backgroundColor: 'red',
        borderRadius: 5,
    },
});

const enhance = withObservables(['allocations'], () => ({
    allocations: allocationsCollection.query(Q.sortBy('created_at', Q.desc)),
}))

const EnhancedAllocationsScreen = enhance(AllocationsScreen);

export default EnhancedAllocationsScreen;