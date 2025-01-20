export function randomlyFillData<Data extends Array<any>>(
	data: Data,
	length: number,
) {
	let randomlyFilledData: (Data[number] | null)[];

	if (data.length < length) {
		randomlyFilledData = Array.from<null>({ length }).fill(null);

		for (let i = 0; i <= data.length; i++) {
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
	} else {
		randomlyFilledData = data;
	}

	return randomlyFilledData;
}
