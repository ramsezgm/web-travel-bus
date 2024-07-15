import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false, // Necesario para manejar el stream de proxy
  },
};

const proxy = createProxyMiddleware({
  target: 'https://travel-bus-81kx.onrender.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '', // Elimina "/api/proxy" de la URL
  },
});

export default function handler(req, res) {
  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}
