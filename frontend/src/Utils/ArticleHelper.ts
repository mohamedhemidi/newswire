export function splitArticleIntoParagraphs(
  text: string ,
  sentencesPerParagraph: number
) {
  const sentences = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g);

  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    const paragraph = sentences.slice(i, i + sentencesPerParagraph).join(" ");
    paragraphs.push(paragraph);
  }

  return paragraphs;
}
