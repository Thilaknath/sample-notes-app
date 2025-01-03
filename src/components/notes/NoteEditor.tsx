import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface NoteEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ initialContent = '', onSave }) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSave(content);
      if (!initialContent) {
        setContent('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Write your note here..."
      />
      <button
        type="submit"
        className="btn btn-primary mt-4 flex items-center justify-center"
        disabled={!content.trim()}
      >
        <Save className="mr-2" size={20} />
        Save Note
      </button>
    </form>
  );
};