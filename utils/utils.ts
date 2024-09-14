function checkIfUrlIsValid(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
}
const modelOptions = [
  { value: "gpt-3.5-turbo-1106", key: "open-ai", label: "GPT-3.5 Turbo" },
  { value: "gpt-4", key: "open-ai", label: "GPT-4" },
  { value: "gemini-pro", label: "Gemini Pro", key: "google" },
  {
    value: "claude-3-5-sonnet-20240620",
    label: "Claude-3-5 Sonnet",
    key: "anthropic",
  },
];

const languages = [
  { value: "javascript", label: "Javascript" },
  { value: "typescript", label: "Typescript" },
  { value: "python", label: "Python" },
  { value: "rust", label: "Rust" },
  { value: "c", label: "C" },
  { value: "go", label: "Go" },
  { value: "C#", label: "C#" },
  { value: "kotlin", label: "Kotlin" },
  { value: "java", label: "Java" },
];

export { checkIfUrlIsValid, modelOptions, languages };
