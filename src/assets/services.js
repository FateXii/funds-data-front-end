export const FV = (
  presentExpectedValue,
  yearsTillMaturity,
  inflationRate,
) => Number(presentExpectedValue * (1 + inflationRate) ** yearsTillMaturity);
export const presentValue = (
  yearsInofPayOutRequired,
  amountRequiredForPayOut,
  inflationRate,
) => Number(amountRequiredForPayOut
  * ((1 - (1 + inflationRate) ** -yearsInofPayOutRequired) / inflationRate));
export const presentValueOfFundsRequired = (
  monthlyContribution,
  yearsTillMaturity,
  interest,
) => Number(monthlyContribution
  * ((1 - (1 + interest) ** -yearsTillMaturity) / interest));
export const interestRequired = (currentValue, futureValue, term) => {
  const p1 = (futureValue / currentValue);
  const p2 = (1 / term);
  return Number((p1 ** p2) - 1) * 100;
};
export const FVwithInstallments = (PV, PMT, i, T, n) => Number(
  FV(PV, n, i)
  + (PMT / 1) * (((1 + i) ** n) - 1) * (1 - i * T),
);
