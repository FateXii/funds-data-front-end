interface PrincipleOptInstallment {principle:number, installment?:number}
interface InstallmentOptPrinciple {principle?:number, installment:number}
interface PrincipleInstallment {principle:number, installment:number}

type InvestmentAmount =
  PrincipleOptInstallment |
  InstallmentOptPrinciple |
  PrincipleInstallment
type InvestmentGoals = Array<InvestmentGoal>;
