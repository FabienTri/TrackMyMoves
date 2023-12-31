import { useFocusEffect, useTheme } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityState, changeActivityType } from '../../redux/apiActivitySlice';
import { listActivityTypeAPI } from '../APIFunctions';
import Dropdown from '../Dropdown';

const TopMove = () => {
    // Logged account and current activity stored in redux
    const apiAccount = useSelector((state) => state.apiAccount);
    const apiActivity = useSelector((state) => state.apiActivity);

    // State variables
    const [list, setList] = useState([]); // List of activity types

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        section: {
            width: '80%',
            height: '30%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        warningText: {
            color: colors.error,
            textAlign: 'center'
        },
        container: {
            marginTop: 10
        },
        activityText: {
            color: colors.text,
            fontSize: fontSizes.md,
            textAlign: 'center'
        }
    });


    useFocusEffect(
        useCallback(() => {
            let isSubscribed = true;

            // declare the async data fetching function
            const getData = async () => {
                // get the activity types et set it
                const activityTypes = await listActivityTypeAPI(apiAccount.token);
                setList(activityTypes);
            }

            if (isSubscribed) {
                // use function if `isSubscribed` is true
                getData().catch(console.error); // make sure to catch any error
            }

            // cancel any future `setData`
            return () => isSubscribed = false;
        }, [])
    );


    const dispatch = useDispatch();

    const dispatchActivityType = (activityType) => {
        if (apiActivity.activity_type !== activityType) dispatch(changeActivityType({ activityType: activityType }));
    };


    if (apiActivity.current_state === ActivityState.starting) {
        return (
            <View style={styles.section}>
                <Text style={styles.warningText}> Please note, the type of activity can no longer be modified after the activity has started </Text>
                <Dropdown items={list} onChangeValue={dispatchActivityType} leadingIcon={true} width={120} containerStyle={styles.container} />
            </View>
        );
    } else {
        return (
            <View style={styles.section}>
                <IconButton icon={apiActivity.activity_type.leading_icon} iconColor={colors.text} size={fontSizes.medButton} />
                <Text style={styles.activityText}> {apiActivity.activity_type.label} </Text>
            </View>
        );
    };
};

export default TopMove;