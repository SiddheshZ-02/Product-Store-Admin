export const openWhatsApp = (
  phone: string,
  message: string
) => {
  const cleanPhone =
    phone.replace(/\D/g, "");

  const url =
    `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      message
    )}`;

  window.open(
    url,
    "_blank"
  );
};