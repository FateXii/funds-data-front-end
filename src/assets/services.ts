export const FV = (
  presentExpectedValue: number,
  yearsTillMaturity: number,
  inflationRate: number,
):number => Number(
  presentExpectedValue * (1 + inflationRate) ** yearsTillMaturity,
);

export const presentValue = (
  yearsInofPayOutRequired:number,
  amountRequiredForPayOut:number,
  inflationRate:number,
):number => Number(amountRequiredForPayOut
  * ((1 - (1 + inflationRate) ** -yearsInofPayOutRequired) / inflationRate));

export const presentValueOfFundsRequired = (
  monthlyContribution:number,
  yearsTillMaturity:number,
  interest:number,
):number => Number(monthlyContribution
  * ((1 - (1 + interest) ** -yearsTillMaturity) / interest));

export const interestRequired = (
  currentValue:number, futureValue:number, term:number,
):number => {
  const p1 = (futureValue / currentValue);
  const p2 = (1 / term);
  return Number((p1 ** p2) - 1) * 100;
};

export const FVwithInstallments = (
  PV:number, PMT:number, i:number, T:number, n:number,
) => Number(
  FV(PV, n, i)
  + (PMT / 1) * (((1 + i) ** n) - 1) * (1 - i * T),
);
