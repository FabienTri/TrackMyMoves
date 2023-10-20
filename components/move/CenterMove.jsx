import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";

const CenterMove = () => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        section: {
            width: '80%',
            height: '40%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textButton: {
            color: colors.text,
            fontSize: fontSizes.lg
        }
    });

    return (
        <View style={styles.section}>
            <Text style={styles.textButton}> Start </Text>
        </View>
    );
};

export default CenterMove;