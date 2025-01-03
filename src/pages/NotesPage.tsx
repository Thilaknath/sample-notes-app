import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { NoteList } from '../components/notes/NoteList';
import { NoteEditor } from '../components/notes/NoteEditor';
import { createNote, updateNote, deleteNote, getUserNotes } from '../services/notes';
import { signOut } from '../services/auth';
import { Note } from '../types';

export const NotesPage: React.FC = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const loadNotes = async () => {
    if (!user) return;
    try {
      const userNotes = await getUserNotes(user.uid);
      setNotes(userNotes);
    } catch (error) {
      toast.error('Failed to load notes');
    }
  };

  const handleSaveNote = async (content: string) => {
    if (!user) return;

    try {
      if (selectedNote) {
        await updateNote(selectedNote.id, content);
        setNotes(notes.map(note =>
          note.id === selectedNote.id
            ? { ...note, content, updatedAt: new Date() }
            : note
        ));
        setSelectedNote(null);
      } else {
        const noteId = await createNote(user.uid, content);
        const newNote = {
          id: noteId,
          content,
          userId: user.uid,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setNotes([newNote, ...notes]);
      }
      toast.success(selectedNote ? 'Note updated!' : 'Note created!');
    } catch (error) {
      toast.error('Failed to save note');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
      toast.success('Note deleted!');
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="btn btn-secondary flex items-center"
            >
              <LogOut className="mr-2" size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Notes</h2>
              <button
                onClick={() => setSelectedNote(null)}
                className="btn btn-primary flex items-center"
              >
                <Plus className="mr-2" size={20} />
                New Note
              </button>
            </div>
            <NoteList
              notes={notes}
              onEditNote={setSelectedNote}
              onDeleteNote={handleDeleteNote}
            />
          </div>
          <div className="lg:pl-8">
            <h2 className="text-xl font-semibold mb-4">
              {selectedNote ? 'Edit Note' : 'Create New Note'}
            </h2>
            <NoteEditor
              initialContent={selectedNote?.content}
              onSave={handleSaveNote}
            />
          </div>
        </div>
      </main>
    </div>
  );
};