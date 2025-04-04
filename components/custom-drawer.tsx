import { View } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from './ui/text';
import { supabase } from '~/lib/supabase';
import { Button } from './ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';

import { useUserSession } from '~/lib/user-context';

export default function CustomDrawerContent(props: any) {
    const { bottom } = useSafeAreaInsets();
    const { session, setSession } = useUserSession()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const logOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error(error)

        setIsOpen(false)
        setSession(null) // Update variables here, _layout will redirect.
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <Dialog open={isOpen}>
                <DialogTrigger onPress={() => setIsOpen(true)} asChild className='mx-4'>
                    <Button
                        variant={'destructive'}
                        className='mb-4 mx-4 rounded-full'
                        style={{ padding: 20, paddingBottom: bottom + 10 }}
                    >
                        <Text>Logout</Text>
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>¿Cerrar sesión?</DialogTitle>
                        <DialogDescription>
                            Si continuas saldrás de tu cuenta.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button className='rounded-full' variant={'destructive'} onPress={logOut}>
                                <Text>Salir</Text>
                            </Button>
                        </DialogClose>
                        <DialogClose onPress={() => setIsOpen(false)} asChild>
                            <Button className='rounded-full'>
                                <Text>Quedarse</Text>
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </View>
    )
}