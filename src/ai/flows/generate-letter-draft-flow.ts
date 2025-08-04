
'use server';
/**
 * @fileOverview Flow to generate a letter draft based on applicant data.
 *
 * - generateLetterDraft - A function that generates a letter draft using AI.
 * - GenerateLetterDraftInput - The input type for the generateLetterDraft function.
 * - GenerateLetterDraftOutput - The return type for the generateLetterDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLetterDraftInputSchema = z.object({
  applicantName: z.string().describe('The full name of the applicant.'),
  nik: z.string().describe('The National Identity Number (NIK) of the applicant.'),
  letterType: z.string().describe('The type of letter being requested.'),
  purpose: z.string().describe('The purpose of the letter request.'),
});
export type GenerateLetterDraftInput = z.infer<typeof GenerateLetterDraftInputSchema>;

const GenerateLetterDraftOutputSchema = z.object({
  draft: z.string().describe('The generated letter draft content.'),
});
export type GenerateLetterDraftOutput = z.infer<typeof GenerateLetterDraftOutputSchema>;

export async function generateLetterDraft(input: GenerateLetterDraftInput): Promise<GenerateLetterDraftOutput> {
  return generateLetterDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLetterDraftPrompt',
  input: {schema: GenerateLetterDraftInputSchema},
  output: {schema: GenerateLetterDraftOutputSchema},
  prompt: `
You are an expert administrative assistant for an Indonesian village office (Kantor Desa).
Your task is to generate a formal letter draft based on the provided information.

The letter should be in Bahasa Indonesia.
It must be formal, well-structured, and include common elements of an official Indonesian letter, such as:
- A header (KOP Surat) with a placeholder for the village name.
- A title for the letter.
- A letter number placeholder (e.g., Nomor: 470/___/PEM).
- A body text that clearly states the information based on the request.
- A closing section.
- A placeholder for the signature of the Village Head (Kepala Desa).

Use the following information to create the draft:
- Letter Type: {{{letterType}}}
- Applicant's Full Name: {{{applicantName}}}
- Applicant's NIK: {{{nik}}}
- Purpose/Reason: {{{purpose}}}

Based on the applicant's data, create a draft for the "{{{letterType}}}".
The body of the letter should state that the person named {{{applicantName}}} with NIK {{{nik}}} is indeed a resident of the village and requires the letter for the stated purpose: "{{{purpose}}}".
Ensure the final output is just the raw text of the letter draft.
`,
});

const generateLetterDraftFlow = ai.defineFlow(
  {
    name: 'generateLetterDraftFlow',
    inputSchema: GenerateLetterDraftInputSchema,
    outputSchema: GenerateLetterDraftOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
