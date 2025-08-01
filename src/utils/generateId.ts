import { v4 as uuidv4 } from "uuid";

export class GenerateId {
  constructor() {}

  static fileImportFromLink = () => {
    return `file-import-from-link-${uuidv4()}`;
  };

  static fileImportFromLocal = () => {
    return `file-import-from-local-${uuidv4()}`;
  };
}
