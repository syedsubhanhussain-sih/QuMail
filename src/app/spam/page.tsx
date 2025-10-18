import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { QuMailLogoSimple } from '@/components/icons';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Edit } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';

export default function SpamPage() {
  return (
    <SidebarProvider>
    <div className="flex h-screen w-full flex-col bg-background font-display text-foreground">
      <header className="flex shrink-0 items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <Link href="/inbox" className="flex items-center gap-4">
            <QuMailLogoSimple className="h-8 w-8 text-primary" />
            <h1 className="text-lg font-bold text-foreground">QuMail</h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button className="gap-2" asChild>
            <Link href="/compose">
              <Edit className="h-4 w-4" />
              <span>Compose</span>
            </Link>
          </Button>
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <SidebarInset>
          <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-headline mb-6 text-3xl font-bold text-foreground">
                Spam
              </h2>
              <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <p>Hooray, no spam!</p>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </div>
    </SidebarProvider>
  );
}
