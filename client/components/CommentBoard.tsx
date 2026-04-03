import React, { useState, useEffect, useRef } from 'react';
import { UserSession, Comment } from '../types';
import { CommentService } from '../services/supabaseService';
import { Button } from './Button';

interface CommentBoardProps {
  session: UserSession;
  onLogout: () => void;
}

export const CommentBoard: React.FC<CommentBoardProps> = ({ session, onLogout }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    CommentService.getComments().then(setComments);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session.token) return;

    setLoading(true);
    try {
      const added = await CommentService.postComment(newComment, session.username, session.token);
      setComments(prev => [added, ...prev]);
      setNewComment('');
    } catch (err: any) {
      console.error("Submission Error:", err);
      let msg = "Unknown error";
      if (err instanceof Error) {
        msg = err.message;
      } else if (typeof err === 'object' && err !== null) {
        try {
          msg = JSON.stringify(err);
        } catch {
          msg = String(err);
        }
      } else {
        msg = String(err);
      }
      alert(`Failed to post message. System says: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in-up flex flex-col h-[80vh]">
      
      {/* Top Bar (Server Info) */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
            <h1 className="text-3xl font-pixel text-white text-shadow-mc">SERVER CHAT</h1>
            <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#55ff55]"></div>
                 <p className="text-lg font-pixel text-[#aaaaaa] text-shadow-mc">
                    Connected as <span className="text-white">{session.username}</span>
                 </p>
            </div>
        </div>
        <Button onClick={onLogout} className="h-10 text-lg px-4 bg-[#c6c6c6]">
            Disconnect
        </Button>
      </div>

      {/* Chat History - Looking like in-game chat */}
      <div className="flex-grow bg-[#00000080] p-4 overflow-y-auto custom-scrollbar flex flex-col-reverse gap-1 border-2 border-black/20 backdrop-blur-[2px] mb-4 rounded-sm">
        {comments.map((comment) => (
            <div key={comment.id} className="group flex gap-2 font-pixel text-xl leading-snug text-white/90 hover:bg-black/40 px-1 rounded-sm transition-colors">
                 {/* Timestamp in grey */}
                <span className="text-[#aaaaaa] font-thin min-w-[60px] select-none text-lg pt-[2px]">
                    {new Date(comment.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
                
                <div className="break-all">
                    <span className="text-white drop-shadow-sm cursor-pointer hover:underline">
                        &lt;{comment.user}&gt;
                    </span>
                    <span className="text-white ml-2 drop-shadow-sm">{comment.text}</span>
                </div>
            </div>
        ))}
        {comments.length === 0 && <p className="text-[#aaaaaa] font-pixel italic p-2">Waiting for chunks to load...</p>}
      </div>

      {/* Chat Input */}
      <div className="bg-[#00000080] p-1 backdrop-blur-sm">
         <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-grow">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white font-pixel text-xl">&gt;</span>
                <input
                    className="w-full bg-black/50 text-white border-none p-3 pl-6 focus:outline-none focus:bg-black/70 font-pixel text-xl placeholder-gray-500 border-b-2 border-transparent focus:border-white transition-colors"
                    placeholder="Type a message..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    autoFocus
                />
            </div>
            <Button type="submit" isLoading={loading} disabled={!newComment.trim()} className="w-32">
                Send
            </Button>
         </form>
      </div>
    </div>
  );
};