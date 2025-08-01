type GetInfoImageFromLinkReturn = {
  host: string | null;
  filename: string | null;
  exp: string | null;
};

type GetInfoImageFromLinkParams = {
  url: string;
};

export const getInfoImageFromLink = ({
  url,
}: GetInfoImageFromLinkParams): GetInfoImageFromLinkReturn => {
  const result: GetInfoImageFromLinkReturn = {
    host: null,
    filename: null,
    exp: null,
  };
  const urlObj = new URL(url);
  const host = urlObj.host;
  const filename = urlObj.pathname.split("/").pop()?.split("?")[0];
  if (host) {
    result.host = host;
  }
  if (filename) {
    const [name, exp] = filename.split(".");
    if (exp) {
      result.exp = exp;
    }
    result.filename = name;
  }
  return result;
};
