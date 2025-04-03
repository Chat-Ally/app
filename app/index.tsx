import * as React from 'react';
import Auth from '~/components/auth';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ActivityIndicator, View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { router, useRootNavigationState } from 'expo-router';

export default function Screen() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true);
  const navigationState = useRootNavigationState(); // Ensures navigation is ready

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(false)
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (!loading && navigationState?.key) {
      if (session && session.user) {
        router.replace('/(drawer)');
      }
    }
  }, [session, loading, navigationState]);


  if (loading || !navigationState?.key) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  if (!session || !session.user.id) {
    return (
      <Auth />
    )
  }

}