const baseURL = location.origin + '/api';

export const get = async (path: string) => {
  const resp = await fetch(baseURL + path);
  if (!resp.ok) {
    throw await resp.text();
  }
  return resp;
};

export const post = async (path: string, body: any) => {
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');
  const resp = await fetch(baseURL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    throw await resp.text();
  }
  return resp;
};
