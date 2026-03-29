import { createAdminClient } from './supabase/admin';

const BUCKET = 'reports';

export async function uploadPDF(
  pdfBuffer: Buffer,
  sessionId: string,
  offerType: string
): Promise<string> {
  const supabase = createAdminClient();
  const filename = `${sessionId}/${offerType}-${Date.now()}.pdf`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (error) throw new Error(`Storage upload failed: ${error.message}`);

  // Create signed URL valid for 30 days
  const { data: signedData, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filename, 60 * 60 * 24 * 30);

  if (signError || !signedData) {
    throw new Error(`Signed URL creation failed: ${signError?.message}`);
  }

  return signedData.signedUrl;
}

export async function getPDFBuffer(signedUrl: string): Promise<Buffer> {
  const res = await fetch(signedUrl);
  if (!res.ok) throw new Error('Failed to fetch PDF from storage');
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
