/**
 * Builds className out of provided classes or objects. If class can be used it will be used otherwise, it will be dissmised
 *
 * @param string
 * @returns
 */
export const buildClass = (...classes: string[]) => {
  const builtClass = classes
    .join(' ')
    .split(' ')
    .filter(
      (className) => typeof className === 'string' && className.length && className.length > 0
    )
    .sort()
    .join(' ')
    .replace(/\s+/g, ' ')
    .trimEnd();
  return builtClass.length > 0 ? builtClass : null;
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};