export interface Repository {
  id: string;
  name: string;
  description: string;
  languages: Language[];
  url: string;
  stargazers: {
    totalCount: number;
  };
}

export interface Language {
  name: string;
}
export interface RepositoryItemProps {
  repository: Repository;
}
