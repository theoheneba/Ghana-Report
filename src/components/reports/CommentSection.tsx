import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { useComments } from '../../hooks/useComments';
import { formatDate } from '../../utils/date';

interface CommentSectionProps {
  reportId: string;
}

export function CommentSection({ reportId }: CommentSectionProps) {
  const [comment, setComment] = useState('');
  const { comments, addComment, isLoading } = useComments(reportId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    await addComment(comment);
    setComment('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Comments</h3>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex justify-between text-sm text-gray-500">
              <span>{comment.user_email}</span>
              <span>{formatDate(comment.created_at)}</span>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1"
          rows={2}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !comment.trim()}
          className="self-end"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}