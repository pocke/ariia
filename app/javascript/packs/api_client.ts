const baseURL = location.origin + '/api';
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');

export const get = async (path: string): Promise<Response> => {
  const resp = await fetch(baseURL + path);
  if (!resp.ok) {
    throw await resp.text();
  }
  return resp;
};

export const post = async (path: string, body: any = undefined) => {
  const resp = await fetch(baseURL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!resp.ok) {
    throw await resp.text();
  }
  return resp;
};

export const del = async (path: string): Promise<Response> => {
  const resp = await fetch(baseURL + path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
  });
  if (!resp.ok) {
    throw await resp.text();
  }
  return resp;
};
