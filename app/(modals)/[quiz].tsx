import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
import { ChatHistory, initialHistory } from '@/constants/Types';
import AskGemini from '@/lib/AskGemini';

export default function App() {
    const [history, setHistory] = useState<ChatHistory>(initialHistory);
    const navigation = useNavigation();
    const { quiz } = useLocalSearchParams();

    // Extracting the question from `quiz`
    const question = typeof quiz === 'string' ? quiz : quiz?.[0];

    useEffect(() => {
        navigation.setOptions({
            title: question || 'Quiz',
        });

        // Add the user's input to history
        setHistory((prevHistory) => [
            ...prevHistory,
            {
                role: 'user',
                parts: [
                    {
                        text: `${question}`,
                    },
                ],
            },
        ]);
    }, [navigation, question]);

    // Fetch the bot's response
    const fetchAnswer = async () => {
        if (!question) return;
        const response = await AskGemini(question, initialHistory, 'maths');
        console.log("res from gemini",response);

        // setHistory((prevHistory) => [
        //     ...prevHistory,
        //     {
        //         role: 'bot',
        //         parts: [
        //             {
        //                 text: response,
        //             },
        //         ],
        //     },
        // ]);
    };

    useEffect(() => {
        fetchAnswer();
    }, [question]);

    console.log(quiz);

    return (
        <View style={styles.container}>
            <FlatList
                data={history} // Pass history as the data source
                keyExtractor={(item, index) => `${item.role}-${index}`} // Generate unique keys
                renderItem={({ item }) => (
                    <Text
                        style={[
                            styles.Text,
                            {
                                backgroundColor: item.role === 'user' ? 'blue' : 'red',
                                alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
                            },
                        ]}
                    >
                        {item.parts[0].text}
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.SubjectCard,
        padding: 10,
    },
    Text: {
        color: 'white',
        maxWidth: '70%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
});