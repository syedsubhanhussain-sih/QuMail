import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { QuMailLogoSimple } from '@/components/icons';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Edit } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
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
            <div className="mx-auto max-w-4xl space-y-8">
                <div>
                    <h2 className="font-headline mb-2 text-3xl font-bold text-foreground">
                    Profile
                    </h2>
                    <p className="text-muted-foreground">Manage your account settings and public profile.</p>
                </div>

              <Card>
                <CardHeader>
                  <CardTitle>Public Profile</CardTitle>
                  <CardDescription>
                    This information will be displayed publicly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Alexei Volkov" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alexei.volkov@qumail.com" />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </div>
    </SidebarProvider>
  );
}