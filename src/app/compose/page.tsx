import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import { ComposeForm } from './_components/compose-form';
import Link from 'next/link';
import { QuMailLogoSimple } from '@/components/icons';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Edit } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';

export default function ComposePage() {
  return (
    <SidebarProvider>
    <div className="flex h-screen w-full flex-col bg-background font-display text-foreground">
      <header className="flex shrink-0 items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-4">
          <Link href="/inbox" className="flex items-center gap-4">
            <QuMailLogoSimple className="h-8 w-8 text-primary" />
            <h1 className="text-lg font-bold text-foreground">QuMail</h1>
          </Link>
          </div>
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
                  New Message
                </h2>
                <ComposeForm />
              </div>
            </main>
        </SidebarInset>
      </div>
    </div>
    </SidebarProvider>
  );
}
