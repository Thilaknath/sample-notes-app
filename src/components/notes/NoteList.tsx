import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Note } from '../../types';

interface NoteListProps {
  notes: Note[];
  onEditNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onEditNote, onDeleteNote }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No notes found. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <p className="text-gray-800 line-clamp-3">{note.content}</p>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEditNote(note)}
                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDeleteNote(note.id)}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};