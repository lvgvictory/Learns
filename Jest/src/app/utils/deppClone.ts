export function deppCLone<T extends object>(obj:T): T {
  if (typeof obj !== 'object') {
    throw new Error('value must is object');
  }

  return JSON.parse(JSON.stringify(obj));
}
