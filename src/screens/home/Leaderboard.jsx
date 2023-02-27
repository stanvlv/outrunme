import { Box, NativeBaseProvider, Text } from "native-base";
import { View } from "react-native";
import { styles } from "../../styles/Style";

export default function Leaderboard() {
    return (
        <NativeBaseProvider>
            <View style={styles.screenColor}>
        <Box><Text>This is the Leaderboard</Text></Box>
        </View>
        
        </NativeBaseProvider>
    )
}