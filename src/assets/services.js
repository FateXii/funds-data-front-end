export const capitalRequired = (
  presentExpectedValue,
  yearsTillMaturity,
  inflationRate,
) => presentExpectedValue * (1 * inflationRate) ** yearsTillMaturity;
export const presentValue = (
  yearsInofPayOutRequired,
  amountRequiredForPayOut,
  inflationRate,
) => amountRequiredForPayOut
* ((1 - (1 + inflationRate) ** -yearsInofPayOutRequired) / inflationRate);
export const presentValueOfFundsRequired = (
  monthlyContribution,
  yearsTillMaturity,
  interest,
) => monthlyContribution
* ((1 - (1 + interest) ** -yearsTillMaturity) / interest);

export const interestRequired = (currentValue, futureValue, term) => {
  const p1 = (futureValue / currentValue);
  const p2 = (1 / term);
  return ((p1 ** p2) - 1) * 100;
};
