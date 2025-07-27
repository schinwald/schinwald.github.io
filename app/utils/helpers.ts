export function randomlyFillData<A, T extends Array<A>>(
  data: T,
  length: number,
) {
  if (data.length >= length) return data;

  const randomlyFilledData: (T[number] | null)[] = Array.from<null>({
    length,
  }).fill(null);

  for (let i = 0; i < data.length; i++) {
    let j = Math.floor(Math.random() * length);

    while (true) {
      if (!randomlyFilledData[j]) {
        randomlyFilledData[j] = data[i];
        break;
      }

      j++;
      j = j % length;
    }
  }

  return randomlyFilledData;
}

export function fillData<A, T extends Array<A>>(data: T, length: number) {
  if (data.length >= length) return data;

  const filledData: (T[number] | null)[] = Array.from<null>({
    length,
  }).fill(null);

  for (let i = 0; i < data.length; i++) {
    filledData[i] = data[i];
  }

  return filledData;
}
