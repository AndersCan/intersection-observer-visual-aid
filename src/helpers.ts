export function html(strings: TemplateStringsArray, ...values: unknown[]) {
  return strings.map((string, index) => {
    const hasValue = typeof values[index] !== "undefined";
    const value = hasValue ? values[index] : "";

    return `${string}${value}`;
  });
}

export function render(strings: string[]) {
  return strings.join("");
}
