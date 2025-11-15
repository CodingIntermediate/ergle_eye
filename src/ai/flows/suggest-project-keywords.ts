'use server';

/**
 * @fileOverview A flow that suggests keywords and tags for a project description.
 *
 * - suggestProjectKeywords - A function that takes a project description and returns suggested keywords and tags.
 * - SuggestProjectKeywordsInput - The input type for the suggestProjectKeywords function.
 * - SuggestProjectKeywordsOutput - The return type for the suggestProjectKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectKeywordsInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A description of the project for which keywords are to be generated.'),
});
export type SuggestProjectKeywordsInput = z.infer<typeof SuggestProjectKeywordsInputSchema>;

const SuggestProjectKeywordsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('An array of keywords and tags relevant to the project description.'),
});
export type SuggestProjectKeywordsOutput = z.infer<typeof SuggestProjectKeywordsOutputSchema>;

export async function suggestProjectKeywords(
  input: SuggestProjectKeywordsInput
): Promise<SuggestProjectKeywordsOutput> {
  return suggestProjectKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectKeywordsPrompt',
  input: {schema: SuggestProjectKeywordsInputSchema},
  output: {schema: SuggestProjectKeywordsOutputSchema},
  prompt: `You are an expert in identifying relevant keywords and tags for software development projects.

  Given the following project description, suggest a list of keywords and tags that would improve its discoverability and categorization.

  Project Description: {{{projectDescription}}}

  Keywords and Tags:`,
});

const suggestProjectKeywordsFlow = ai.defineFlow(
  {
    name: 'suggestProjectKeywordsFlow',
    inputSchema: SuggestProjectKeywordsInputSchema,
    outputSchema: SuggestProjectKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
