export const fetchCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCategories`
  );

  if (!res.ok) return;

  const data = await res.json();

  return data;
};

export const fetchProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getProducts`
  );

  if (!res.ok) return;

  const data = await res.json();

  return data;
};

export const fetchStripeProducts = async (sessionId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSession?session_id=${sessionId}`
  );

  if (!res.ok) return;

  const data = await res.json();

  return data.data;
};
