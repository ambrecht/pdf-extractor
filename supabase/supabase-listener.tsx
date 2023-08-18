// Importiere erforderliche Module
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSupabase } from './supabase-provider';

// Definition der Komponente SupabaseListener
// Diese Komponente kümmert sich um das Aktualisieren der Serverdaten, wenn sich der Benutzer ein- oder ausloggt
// Dadurch wird vermieden, dass die Sitzungsinformationen an untergeordnete Komponenten weitergegeben werden müssen,
// um bei einer Änderung der Benutzersitzung eine erneute Rendierung zu veranlassen.
// #elegant!
export default function SupabaseListener({
  serverAccessToken,
}: {
  serverAccessToken?: string;
}) {
  // Verwendung der useSupabase-Hook zum Zugriff auf den Supabase-Client
  const { supabase } = useSupabase();
  const router = useRouter();

  // useEffect-Hook zur Aktualisierung der Serverdaten bei Änderungen der Benutzersitzung
  useEffect(() => {
    // Abonnement für Änderungen der Benutzersitzung
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Überprüfung, ob die Access-Token übereinstimmen
      if (session?.access_token !== serverAccessToken) {
        console.log('session', session);
        // Server und Client sind nicht synchron
        // Die Seite wird neu geladen, um aktuelle Serverdaten abzurufen
        // Weitere Informationen: https://beta.nextjs.org/docs/data-fetching/mutating
        router.refresh();
      }
    });

    // Aufräumarbeiten beim Beenden der Komponente
    return () => {
      // Abonnement kündigen
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  // Die Komponente gibt nichts zurück (null)
  return null;
}
