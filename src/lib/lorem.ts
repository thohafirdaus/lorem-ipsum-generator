const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const generateWords = (count: number): string => {
  const words = Array.from({ length: count }, getRandomWord);
  return words.join(" ");
};

export const generateSentences = (count: number): string => {
  const sentences = Array.from({ length: count }, () => {
    const length = Math.floor(Math.random() * 10) + 5; // 5 to 15 words
    const words = Array.from({ length }, getRandomWord);
    return capitalize(words.join(" ")) + ".";
  });
  return sentences.join(" ");
};

export const generateParagraphs = (count: number): string => {
  const paragraphs = Array.from({ length: count }, () => {
    const length = Math.floor(Math.random() * 4) + 3; // 3 to 7 sentences
    return generateSentences(length);
  });
  return paragraphs.join("\n\n");
};
