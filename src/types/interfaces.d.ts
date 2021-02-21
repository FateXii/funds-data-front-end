interface User extends Object {
  name:string,
  surname:string,
  email:string,
  phonenumber:string,
  loggedIn:boolean,
}
interface InvestmentGoal extends Object{
 id:number,
 name: string,
 description?:string,
 investmentAmount: InvestmentAmount,
 length:number,
 investmentGoal:number
}
