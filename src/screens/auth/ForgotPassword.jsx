import { Box, NativeBaseProvider } from "native-base";
import { styles } from '../../styles/Style'

export default function ForgotPassword({ navigation }) {
    return (
        <NativeBaseProvider >
        <Box style={{backgroundColor: styles.appColor.orange}}>Make a new account</Box>
        </NativeBaseProvider>
    )
}