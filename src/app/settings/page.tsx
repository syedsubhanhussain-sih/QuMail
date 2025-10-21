import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { QuMailLogoSimple } from '@/components/icons';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Edit } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
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
            <div className="mx-auto max-w-4xl space-y-8">
              <div>
                <h2 className="font-headline mb-2 text-3xl font-bold text-foreground">
                  Settings
                </h2>
                <p className="text-muted-foreground">Manage your application and notification settings.</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your application.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme" className="flex flex-col space-y-1">
                        <span>Theme</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            Select the theme for the application.
                        </span>
                    </Label>
                    <Select defaultValue="dark">
                      <SelectTrigger id="theme" className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                        <span>Email Notifications</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            Receive notifications for new emails.
                        </span>
                    </Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="desktop-notifications" className="flex flex-col space-y-1">
                        <span>Desktop Notifications</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            Show notifications on your desktop.
                        </span>
                    </Label>
                    <Switch id="desktop-notifications" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </div>
    </SidebarProvider>
  );
}
