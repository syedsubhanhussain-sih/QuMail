'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  AttachFile,
  Loader2,
  Paperclip,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchSecurityGuidance } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  to: z.string().email({ message: 'Invalid email address.' }),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  body: z.string().min(1, { message: 'Message body cannot be empty.' }),
  securityLevel: z.string(),
});

type Attachment = {
  name: string;
  size: number;
};

export function ComposeForm() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [securityLevelToConfirm, setSecurityLevelToConfirm] = useState('');
  const [guidance, setGuidance] = useState('');
  const [isGuidanceLoading, setIsGuidanceLoading] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
      securityLevel: 'Quantum-aided AES',
    },
  });

  const recipient = form.watch('to');
  const messageContent = form.watch('body');

  const getGuidance = useCallback(async () => {
    if (recipient && messageContent) {
      setIsGuidanceLoading(true);
      const result = await fetchSecurityGuidance({ recipient, messageContent });
      setGuidance(result);
      setIsGuidanceLoading(false);
    }
  }, [recipient, messageContent]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      getGuidance();
    }, 1000);

    return () => clearTimeout(debounce);
  }, [recipient, messageContent, getGuidance]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSecurityLevelToConfirm(values.securityLevel);
    setShowConfirmDialog(true);
  }

  function handleSend() {
    console.log('Sending email with values:', form.getValues());
    setShowConfirmDialog(false);
    toast({
      title: 'Email Sent!',
      description: 'Your message has been sent successfully.',
    });
    form.reset();
    setAttachments([]);
    setGuidance('');
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        name: file.name,
        size: file.size,
      }));
      setAttachments(prev => [...prev, ...newFiles]);
    }
  }

  function removeAttachment(index: number) {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  }

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="To" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Cc" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bcc"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormControl>
                    <Input placeholder="Bcc" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write your message here..."
                    rows={12}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {attachments.length > 0 && (
            <div className="space-y-3 rounded-lg border p-4">
              <h3 className="text-base font-medium">Attachments</h3>
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-3">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeAttachment(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}


          <div>
            <FormField
              control={form.control}
              name="securityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a security level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Quantum Secure - OTP">
                        Quantum Secure - OTP
                      </SelectItem>
                      <SelectItem value="Quantum-aided AES">
                        Quantum-aided AES
                      </SelectItem>
                      <SelectItem value="PQC">PQC</SelectItem>
                      <SelectItem value="No Quantum security">
                        No Quantum security
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {(isGuidanceLoading || guidance) && (
              <div className="mt-2 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-primary/80">
                {isGuidanceLoading ? (
                  <Loader2 className="mt-1 h-4 w-4 animate-spin shrink-0" />
                ) : (
                  <Sparkles className="mt-1 h-4 w-4 shrink-0" />
                )}
                <p>{isGuidanceLoading ? 'Analyzing message for security recommendation...' : guidance}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <Button type="button" variant="outline" className="gap-2">
                <Paperclip className="h-4 w-4" />
                <span>Attach File</span>
              </Button>
              <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
            </div>
            <Button type="submit" className="gap-2">
              <span>Send</span>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Send</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to send this email with{' '}
              <span className="font-bold text-primary">
                {securityLevelToConfirm}
              </span>{' '}
              level security. Do you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSend} className="gap-2">
              <span>Send</span>
              <Send className="h-4 w-4" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
