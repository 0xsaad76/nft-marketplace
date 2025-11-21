import { useState } from 'react';
import './App.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UserNftList } from '@/components/UserNftList';
import { MarketplaceList } from '@/components/MarketplaceList';
import { NftCreator } from '@/components/NftCreator';
import { Github, LayoutGrid, Image as ImageIcon, PlusCircle, AlertCircle } from 'lucide-react';

function App() {
  const [view, setView] = useState<'marketplace' | 'my-nfts' | 'create'>('marketplace');

  const NavButton = ({ 
    active, 
    onClick, 
    icon: Icon, 
    label 
  }: { 
    active: boolean; 
    onClick: () => void; 
    icon: any; 
    label: string 
  }) => (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-primary text-primary-foreground shadow-md' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
      <div className="bg-yellow-500/10 border-b border-yellow-500/10 py-2 px-4 flex items-center justify-center gap-2 text-xs font-medium text-yellow-600 dark:text-yellow-500">
        <AlertCircle className="w-3 h-3" />
        <span>Ensure you are on Devnet</span>
      </div>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight text-[#c9c1c1] hidden sm:inline-block">NFT Marketplace</span>
          </div>

          {/* Center Nav */}
          <div className="flex items-center gap-1 bg-secondary/30 p-1.5 rounded-full border border-border/50 backdrop-blur-md">
             <NavButton 
               active={view === 'marketplace'} 
               onClick={() => setView('marketplace')} 
               icon={LayoutGrid} 
               label="Explore" 
             />
             <NavButton 
               active={view === 'my-nfts'} 
               onClick={() => setView('my-nfts')} 
               icon={ImageIcon} 
               label="My NFTs" 
             />
             <NavButton 
               active={view === 'create'} 
               onClick={() => setView('create')} 
               icon={PlusCircle} 
               label="Create" 
             />
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/0xsaad76/nft-marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <div className="transform scale-95">
                <WalletMultiButton style={{ 
                    height: '40px', 
                    fontSize: '14px', 
                    borderRadius: '9999px',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    fontWeight: '600',
                    fontFamily: 'inherit'
                }} />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8">
        {view === 'marketplace' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8 space-y-2 text-center sm:text-left">
                <h2 className="text-3xl font-bold tracking-tight">Marketplace</h2>
                <p className="text-muted-foreground">Discover and collect unique digital assets from the community.</p>
             </div>
            <MarketplaceList />
          </div>
        ) : view === 'my-nfts' ? (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8 space-y-2 text-center sm:text-left">
                <h2 className="text-3xl font-bold tracking-tight">My Collection</h2>
                <p className="text-muted-foreground">Manage your personal NFT collection and listings.</p>
             </div>
            <UserNftList />
          </div>
        ) : (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8 space-y-2 text-center sm:text-left">
                <h2 className="text-3xl font-bold tracking-tight">Create NFT</h2>
                <p className="text-muted-foreground">Mint your own digital masterpiece to the blockchain.</p>
             </div>
            <NftCreator />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;