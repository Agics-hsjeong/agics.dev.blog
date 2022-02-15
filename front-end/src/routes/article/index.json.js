import * as api from "$lib/api.js";

export async function post({ request, locals }) {
  const data = await request.json();
  const body = await api.post(
    "articles",
    data,
    locals.user && locals.user.token
  );

  return {
    body,
  };
}
