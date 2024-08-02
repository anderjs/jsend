export function isAmount(amount: string) {
  const amountNumber = +amount;

  return !isNaN(amountNumber) && amountNumber > 0;
}