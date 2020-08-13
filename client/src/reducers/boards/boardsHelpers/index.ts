export const ChangePositionInArray = (
	array: any[],
	startIndex: number,
	endIndex: number,
	positionValue?: any
) => {
	const resultArray = [...array.slice(0, startIndex), ...array.slice(startIndex + 1)];
	if (positionValue) {
		resultArray.splice(endIndex, 0, positionValue);
	} else {
		resultArray.splice(endIndex, 0, array[startIndex]);
	}
	return resultArray;
};
