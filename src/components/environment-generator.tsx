'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEnvironment } from '@/context/environment-context';
import { generate3DEnvironment } from '@/ai/flows/generate-3d-environment';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  style: z.string().min(2, { message: 'Style is required.' }),
  complexity: z.string().min(2, { message: 'Complexity is required.' }),
  elements: z.string().min(2, { message: 'Elements are required.' }),
});

export function EnvironmentGenerator({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { setEnvironmentScript, isGenerating, setIsGenerating } = useEnvironment();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      style: 'futuristic, minimalist',
      complexity: 'low, with clean lines',
      elements: 'glowing code blocks, floating frames',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setOpen(false);
    try {
      const result = await generate3DEnvironment(values);
      if (result.environmentScript) {
        setEnvironmentScript(result.environmentScript);
        toast({
          title: 'Environment Generated!',
          description: 'Your new 3D world is now active.',
        });
      } else {
          throw new Error('Failed to generate environment script.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate the environment. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline">Generate 3D Environment</DialogTitle>
          <DialogDescription>
            Describe the visual qualities you want for your immersive background.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Style</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., futuristic, minimalist" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complexity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complexity</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., high, low, detailed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="elements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Elements</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., glowing code blocks, floating frames" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <Button type="submit" disabled={isGenerating} className="w-full bg-accent text-background hover:bg-accent/90">
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
