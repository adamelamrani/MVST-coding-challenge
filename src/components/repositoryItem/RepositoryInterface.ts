export interface Repository {
  id: string;
  name: string;
  description: string;
  html_url: string;
}

export interface RepositoryItemProps {
  repository: Repository;
}
