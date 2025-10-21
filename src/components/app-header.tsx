import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { QuMailLogoSimple } from '@/components/icons';
import { UserNav } from '@/components/user-nav';
import { Edit } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b px-4 sm:px-6 py-3">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="hidden sm:flex sm:items-center sm:gap-2">
          <Link href="/inbox" className="flex items-center gap-2">
            <QuMailLogoSimple className="h-8 w-8 text-primary" />
            <h1 className="text-lg font-bold text-foreground">QuMail</h1>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button className="gap-2" asChild>
          <Link href="/compose">
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Compose</span>
          </Link>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
