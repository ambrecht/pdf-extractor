'use client';

import type { Session } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, useState, useEffect } from 'react';
import type { TypedSupabaseClient } from '../app/layout';
import { createBrowserClient } from './supabase-browser';

type MaybeSession = Session | null;
type Note = any;

type SupabaseContext = {
  supabase: TypedSupabaseClient;
  session: MaybeSession;

  notes: Note[]; // Zustand der Notizen hinzufügen
  setNotes: (notes: Note[]) => void; // Funktion zum Aktualisieren der Notizen hinzufügen
};

// @ts-ignore
const Context = createContext<SupabaseContext>();

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: MaybeSession;
}) {
  const [supabase] = useState(() => createBrowserClient());
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    // Notizen aus der Datenbank abrufen und im Zustand setzen
    const { data } = await supabase.from('notes').select('*');
    setNotes(data ?? []);
  };

  const contextValue: SupabaseContext = {
    supabase,
    session,
    notes,
    setNotes,
  };

  useEffect(() => {
    // Notizen beim Laden der Komponente abrufen
    fetchNotes();

    // ...
  }, []);

  return (
    <Context.Provider value={contextValue}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
