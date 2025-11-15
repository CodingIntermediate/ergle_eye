'use server';
/**
 * @fileOverview A flow for generating 3D environments and components based on user specifications.
 *
 * - generate3DEnvironment - A function that generates personalized 3D visuals based on user input.
 * - Generate3DEnvironmentInput - The input type for the generate3DEnvironment function.
 * - Generate3DEnvironmentOutput - The return type for the generate3DEnvironment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const Generate3DEnvironmentInputSchema = z.object({
  style: z
    .string()
    .describe('The desired style of the 3D environment (e.g., futuristic, minimalist).'),
  complexity:
    z.string().describe('The desired complexity of the 3D environment (e.g., high, low, detailed).'),
  elements: z
    .string()
    .describe('Specific elements to include in the 3D environment (e.g., glowing code blocks, floating frames).'),
});
export type Generate3DEnvironmentInput = z.infer<typeof Generate3DEnvironmentInputSchema>;

const Generate3DEnvironmentOutputSchema = z.object({
  environmentDataUri: z
    .string()
    .describe(
      'A data URI containing the generated 3D environment data, suitable for use with Three.js or React Three Fiber.'
    ),
});
export type Generate3DEnvironmentOutput = z.infer<typeof Generate3DEnvironmentOutputSchema>;

export async function generate3DEnvironment(
  input: Generate3DEnvironmentInput
): Promise<Generate3DEnvironmentOutput> {
  return generate3DEnvironmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generate3DEnvironmentPrompt',
  input: {schema: Generate3DEnvironmentInputSchema},
  output: {schema: Generate3DEnvironmentOutputSchema},
  prompt: `You are a 3D environment generation expert. Based on the user's preferences for style, complexity, and elements, generate a 3D environment data URI that can be used in a website.

  Style: {{{style}}}
  Complexity: {{{complexity}}}
  Elements: {{{elements}}}

  Return the 3D environment data URI.
  `,
});

const generate3DEnvironmentFlow = ai.defineFlow(
  {
    name: 'generate3DEnvironmentFlow',
    inputSchema: Generate3DEnvironmentInputSchema,
    outputSchema: Generate3DEnvironmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
