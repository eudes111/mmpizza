export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const generateWhatsAppLink = (
  phone: string,
  cartItems: any[],
  orderDetails: any,
  total: number
) => {
  let message = `Olá, gostaria de fazer um pedido na MM Pizza Delivery 🍕\n\n`;
  
  message += `*Pedido:*\n`;
  cartItems.forEach((item, index) => {
    const flavorNames = item.flavors.map((f: any) => f.name).join(' e ');
    message += `- 1x Pizza Grande: ${flavorNames}`;
    if(item.observation) message += ` (Obs: ${item.observation})`;
    message += `\n`;
  });
  
  message += `\n*Total:* ${formatCurrency(total)}\n`;
  message += `-------------------------------\n`;
  message += `*Nome:* ${orderDetails.customerName}\n`;
  message += `*Endereço:* ${orderDetails.address}\n`;
  
  const paymentMap: Record<string, string> = {
    credit_card: 'Cartão',
    cash: 'Dinheiro',
    meal_voucher: 'Vale-refeição'
  };
  
  message += `*Pagamento:* ${paymentMap[orderDetails.paymentMethod] || 'A combinar'}`;
  
  if (orderDetails.paymentMethod === 'cash' && orderDetails.changeFor) {
    message += ` (Troco para ${orderDetails.changeFor})`;
  }
  
  message += `\n\nObrigado!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};