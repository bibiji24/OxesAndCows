export function check(checkingNumber, unknouwnNumber) {
    let cows = 0;
    let bulls = 0;
    for (let i = 0; i < String(checkingNumber).length; i++) {
        for (let j = 0; j < String(unknouwnNumber).length; j++) {
            if (String(checkingNumber)[i] === String(unknouwnNumber)[j]) {
                if (i === j) {
                    bulls++;
                } else {
                    cows++;
                }
            }
        }
    }
    return {bulls: bulls, cows: cows}
}