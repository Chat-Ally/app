import { View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from './ui/text';
import { supabase } from '~/lib/supabase';
import { Button } from './ui/button';

export default function CustomDrawerContent(props: any) {
    const { bottom } = useSafeAreaInsets();

    const closeDrawer = async () => {
        // this does not seem to affect state, 
        //meaning we should trigger something that 
        // changes state and kicks the suer to auth page
        const { error } = await supabase.auth.signOut()
        if (error) console.error(error)

        // navigation.dispatch(DrawerActions.closeDrawer())
    }

    return (
        <View
            style={{ flex: 1 }}
        >
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <Button onPress={closeDrawer} style={{ padding: 20, paddingBottom: bottom + 10 }}>
                <Text>Logout</Text>
            </Button>
        </View>
    )
}