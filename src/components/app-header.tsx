import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { Edit } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b px-4 sm:px-6 py-3">
      <div className="flex items-center gap-4">
        {/* Sidebar trigger for mobile, hidden on medium screens and up */}
        <SidebarTrigger className="md:hidden" />
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
