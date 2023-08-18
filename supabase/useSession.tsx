'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from './supabase-provider';
import { useRenderCount } from '@/utils/useRenderCount';

export type Session = /*unresolved*/ any;
export type RealtimeChannel = /*unresolved*/ any;

export interface UserProfile {
  username: string;
  avatarUrl?: string;
}

export interface SupashipUserInfo {
  session: Session | null;
  profile: UserProfile | null;
}

export function useSession() {
  const renderCount = useRenderCount();
  const { supabase, session } = useSupabase();
  const [userInfo, setUserInfo] = useState<SupashipUserInfo>({
    profile: null,
    session: null,
  });
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const listenToUserProfileChanges = useCallback(
    async (userId: string) => {
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .filter('user_id', 'eq', userId);
      if (data?.[0]) {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          profile: data[0] as UserProfile,
        }));
      }
      return supabase
        .channel(`public:user_profiles`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_profiles',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            setUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              profile: payload.new as UserProfile,
            }));
          },
        )
        .subscribe();
    },
    [supabase],
  );

  useEffect(() => {
    console.log('listening to auth state changes');
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserInfo({ ...userInfo, session });
      supabase.auth.onAuthStateChange((_event, session) => {
        setUserInfo({ session, profile: null });
      });
    });
  }, [supabase.auth]);

  useEffect(() => {
    if (userInfo.session?.user && !userInfo.profile) {
      console.log('listening to user profile changes');
      listenToUserProfileChanges(userInfo.session.user.id).then(
        (newChannel) => {
          if (channel) {
            channel.unsubscribe();
          }
          setChannel(newChannel);
        },
      );
    } else if (!userInfo.session?.user) {
      channel?.unsubscribe();
      setChannel(null);
    }
  }, [userInfo.session]);

  console.log('useSession', renderCount);

  return userInfo;
}
