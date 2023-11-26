export interface Repository {
  id: string;
  name: string;
  description: string;
  languages: LanguageNodes;
  url: string;
  stargazers: {
    totalCount: number;
  };
}

interface LanguageNodes {
  nodes: Language[];
}

export interface Language {
  name: string;
  color: string;
  id: string;
}
export interface RepositoryItemProps {
  repository: Repository;
}

export interface PageInfo {
  endCursor: string;
  startCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface UserData {
  search: {
    nodes: Repository[];
    pageInfo: PageInfo;
  };
}
