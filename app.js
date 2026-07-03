import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet
} from 'react-native';

import axios from 'axios';

export default function App() {

    const [nama, setNama] = useState('');
    const [nim, setNim] = useState('');
    const [data, setData] = useState([]);

    const API_URL = "http://10.55.129.254:5000/api/mahasiswa";

    const getData = async () => {
        try {
            const response = await axios.get(API_URL);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const simpanData = async () => {
        try {
            await axios.post(API_URL, {
                nama,
                nim
            });

            setNama('');
            setNim('');

            getData();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>

            <TextInput
                placeholder="Nama"
                value={nama}
                onChangeText={setNama}
                style={styles.input}
            />

            <TextInput
                placeholder="NIM"
                value={nim}
                onChangeText={setNim}
                style={styles.input}
            />

            <Button
                title="Simpan"
                onPress={simpanData}
            />

            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Text>
                        {item.nama} - {item.nim}
                    </Text>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 50
    },

    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    }
});