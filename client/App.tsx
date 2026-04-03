import React, { useState } from 'react';
import { Craftcha } from './components/Craftcha';
import { CommentBoard } from './components/CommentBoard';
import { UserSession } from './types';
import { Button } from './components/Button';

function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleCaptchaVerified = (token: string) => {
    setSession({
      username: usernameInput || 'Steve',
      token: token
    });
    setShowCaptcha(false);
  };

  const startLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim().length < 3) {
      alert("Username too short");
      return;
    }
    setShowCaptcha(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      
      {/* Main Container */}
      <div className="w-full max-w-5xl flex flex-col items-center">
        
        {/* Title Logo */}
        {!session && (
          <div className="mb-12 text-center flex flex-col items-center">
             <div className="relative">
                 <h1 className="text-8xl font-pixel text-[#bfbfbf] tracking-wider relative z-10"
                     style={{ 
                         textShadow: '0px 4px 0px #3f3f3f, 0px 8px 0px #212121' // Deep 3D Shadow
                     }}>
                    CRAFTCHA
                 </h1>
             </div>
             
             <div className="mt-4 text-yellow-300 font-pixel text-2xl animate-bounce drop-shadow-[2px_2px_0_rgba(0,0,0,0.75)] rotate-[-2deg]">
                No bots allowed!
             </div>
          </div>
        )}

        {session ? (
            <CommentBoard 
                session={session} 
                onLogout={() => setSession(null)} 
            />
        ) : (
            <div className="w-full max-w-sm">
                
                {!showCaptcha ? (
                    // Login Panel - Styled like Server Entry or Main Menu
                    <div className="flex flex-col gap-4 w-full">
                         <div className="bg-[#00000080] backdrop-blur-sm p-1">
                            <form onSubmit={startLogin} className="flex flex-col gap-4">
                                <div>
                                    <label className="block font-pixel text-xl text-[#e0e0e0] mb-1 pl-1 text-shadow-mc">Username</label>
                                    <input 
                                        type="text" 
                                        className="w-full h-12 bg-black text-white border-2 border-[#a0a0a0] p-3 font-pixel text-xl focus:outline-none focus:border-white shadow-[inset_2px_2px_0_rgba(0,0,0,0.5)]"
                                        placeholder=""
                                        value={usernameInput}
                                        onChange={(e) => setUsernameInput(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                
                                <Button type="submit" fullWidth className="h-12 text-2xl">
                                    Join Server
                                </Button>
                             </form>
                        </div>
                    </div>
                ) : (
                    // Captcha Panel
                    <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                        <div className="bg-[#00000080] p-4 rounded mb-4">
                             <p className="text-white font-pixel text-xl text-center mb-2 text-shadow-mc">
                                 Anti-Bot Verification Required
                             </p>
                        </div>
                        
                        <Craftcha onVerify={handleCaptchaVerified} />
                        
                        <div className="mt-6">
                            <Button onClick={() => setShowCaptcha(false)} variant="secondary" className="w-48">
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>

      <footer className="fixed bottom-2 text-white/70 font-pixel text-lg text-shadow-mc">
         Minecraft is a trademark of Mojang Synergies AB. This is a fan demo.
      </footer>
    </div>
  );
}

export default App;