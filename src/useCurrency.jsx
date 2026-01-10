const intl = new Intl.NumberFormat("en-Us", {
  style: "currency",
  currency: "USD",
});

export default function useCurrency(price) {
  return formatCurrency(price);
}

export function formatCurrency(price) {
  return intl.format(price);
}
