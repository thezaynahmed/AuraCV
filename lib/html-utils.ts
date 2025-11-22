/**
 * Converts HTML to plain text, preserving line breaks and lists
 */
export function htmlToPlainText(html: string): string {
  if (!html || typeof html !== 'string') return '';
  
  try {
    // Remove empty paragraphs
    let text = html.replace(/<p><\/p>/g, '');
    
    // Convert list items to bullet points
    text = text.replace(/<li>(.*?)<\/li>/g, '• $1\n');
    
    // Convert paragraphs to line breaks
    text = text.replace(/<\/p>/g, '\n');
    text = text.replace(/<p>/g, '');
    
    // Convert line breaks
    text = text.replace(/<br\s*\/?>/g, '\n');
    
    // Remove all other HTML tags
    text = text.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    
    // Clean up extra whitespace and newlines
    text = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
    
    return text.trim();
  } catch (error) {
    console.error('Error converting HTML to plain text:', error);
    return html; // Return original if parsing fails
  }
}

/**
 * Extracts bullet points from HTML list items
 */
export function htmlToBullets(html: string): string[] {
  if (!html || typeof html !== 'string') return [];
  
  try {
    const bullets: string[] = [];
    
    // Extract list items
    const liMatches = html.match(/<li>(.*?)<\/li>/g);
    if (liMatches) {
      liMatches.forEach(match => {
        const text = match
          .replace(/<li>|<\/li>/g, '')
          .replace(/<[^>]*>/g, '')
          .trim();
        if (text) bullets.push(text);
      });
    }
    
    // If no list items, split by paragraphs or newlines
    if (bullets.length === 0) {
      const plainText = htmlToPlainText(html);
      const lines = plainText.split('\n').filter(line => line.trim().length > 0);
      return lines;
    }
    
    return bullets;
  } catch (error) {
    console.error('Error extracting bullets from HTML:', error);
    return []; // Return empty array if parsing fails
  }
}
