export interface ATSAnalysisResult {
  score: number;
  missingKeywords: string[];
  matchedKeywords: string[];
}

const STOP_WORDS = new Set([
  'and', 'the', 'is', 'in', 'at', 'of', 'or', 'a', 'an', 'to', 'for', 'with', 'on', 'as', 'by',
  'we', 'are', 'you', 'your', 'our', 'will', 'be', 'can', 'have', 'has', 'that', 'this', 'it',
  'from', 'but', 'not', 'if', 'when', 'where', 'which', 'who', 'whom', 'whose', 'why', 'how',
  'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'too', 'very', 'can', 'will', 'just', 'should', 'now', 'experience', 'work', 'job', 'role',
  'team', 'skills', 'responsibilities', 'requirements', 'qualification', 'qualifications',
  'years', 'degree', 'bachelor', 'master', 'phd', 'preferred', 'plus', 'strong', 'knowledge',
  'ability', 'proficient', 'familiar', 'understanding', 'excellent', 'good', 'great', 'like',
  'looking', 'seeking', 'opportunity', 'position', 'candidate', 'must', 'required'
]);

export function analyzeResume(resumeText: string, jobDescription: string): ATSAnalysisResult {
  if (!jobDescription.trim()) {
    return { score: 0, missingKeywords: [], matchedKeywords: [] };
  }

  // Helper to clean and tokenize
  const tokenize = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 2 && !STOP_WORDS.has(word));
  };

  const jdTokens = tokenize(jobDescription);
  const resumeTokens = new Set(tokenize(resumeText));

  // Count frequency in JD
  const frequencyMap: Record<string, number> = {};
  jdTokens.forEach(token => {
    frequencyMap[token] = (frequencyMap[token] || 0) + 1;
  });

  // Get top 15 keywords
  const topKeywords = Object.entries(frequencyMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .map(([word]) => word);

  const matchedKeywords = topKeywords.filter(keyword => resumeTokens.has(keyword));
  const missingKeywords = topKeywords.filter(keyword => !resumeTokens.has(keyword));

  // Calculate score
  // If no keywords found in JD (unlikely if text is present), score is 0
  if (topKeywords.length === 0) return { score: 0, missingKeywords: [], matchedKeywords: [] };

  const score = Math.round((matchedKeywords.length / topKeywords.length) * 100);

  return {
    score,
    missingKeywords,
    matchedKeywords
  };
}
