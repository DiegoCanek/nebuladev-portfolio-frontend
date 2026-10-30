export function getAppPath(path = '', baseUrl = import.meta.env.BASE_URL) {
  const configuredBase = baseUrl.replace(/\/+$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${configuredBase}${suffix}` || '/';
}

export function getRoutePath(pathname, baseUrl = import.meta.env.BASE_URL) {
  const configuredBase = baseUrl.replace(/\/+$/, '');
  let routePath = pathname;

  if (
    configuredBase
    && (pathname === configuredBase || pathname.startsWith(`${configuredBase}/`))
  ) {
    routePath = pathname.slice(configuredBase.length) || '/';
  }

  return routePath.replace(/\/+$/, '') || '/';
}
