import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import { ComposeForm } from './_components/compose-form';
import Link from 'next/link';
import { QuMailLogoSimple } from '@/components/icons';

export default function ComposePage() {
  return (
    <div className="flex h-screen w-full flex-col bg-background font-display text-foreground">
      <header className="flex shrink-0 items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/inbox" className="flex items-center gap-4">
            <QuMailLogoSimple className="h-8 w-8 text-primary" />
            <h1 className="text-lg font-bold text-foreground">QuMail</h1>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Button variant="link" asChild>
            <Link href="/inbox">Inbox</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#">Sent</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#">Drafts</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#">Starred</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#">Spam</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="gap-2" asChild>
            <Link href="/compose">
              <span className="material-symbols-outlined text-base">edit</span>
              <span>Compose</span>
            </Link>
          </Button>
          <UserNav />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-headline mb-6 text-3xl font-bold text-foreground">
            New Message
          </h2>
          <ComposeForm />
        </div>
      </main>
    </div>
  );
}
