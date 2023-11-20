import { RepositoryItemProps } from "./RepositoryInterface";

const RepositoryItem = ({ repository }: RepositoryItemProps): JSX.Element => {
  return (
    <div className="repository-item">
      <p>
        <strong>{repository.name}</strong> {repository.description}
        <a href={repository.html_url}>Access Repository</a>
      </p>
    </div>
  );
};

export default RepositoryItem;
