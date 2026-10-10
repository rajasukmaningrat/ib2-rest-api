export const isValidUserId = (id) => {
  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    return false;
  }

  const numberId = Number(id);

  return Number.isSafeInteger(numberId) && numberId > 0;
};