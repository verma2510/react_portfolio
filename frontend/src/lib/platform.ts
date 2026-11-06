export const isMac = typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.userAgent);

/** "⌘K" on Apple platforms, "Ctrl K" elsewhere. */
export const shortcutLabel = (key: string) => (isMac ? `⌘${key}` : `Ctrl ${key}`);

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
