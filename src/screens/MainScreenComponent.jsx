import { Box, NativeBaseProvider } from "native-base";
import FirebaseDatabase from "../../FirebaseDatabase";
import BottomNavBar from "../components/BottomNavBar";

export default function MainScreenComponent() {
    return (
        <NativeBaseProvider>
        <FirebaseDatabase />
        <BottomNavBar />
        </NativeBaseProvider>
    )
}