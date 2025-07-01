import { useErrorCodesStore } from "@/store/errorCodes";
import type { ErrorCodes } from "@/types/errorCodes";

const errorCodes = useErrorCodesStore.use.data() as ErrorCodes;

type CompareErrorCodes = {
  code: number;
  codeNameCompare: keyof typeof errorCodes;
};

export const compareErrorCodes = ({
  code,
  codeNameCompare,
}: CompareErrorCodes) => {
  for (const name in errorCodes) {
    if (errorCodes[name] === code && name === codeNameCompare) {
      return true;
    }
  }

  return false;
};
