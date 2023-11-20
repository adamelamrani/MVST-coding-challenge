import ListStyleCss from "./repositoriesList.module.css";

interface RepositoriesListProps {
  children: React.ReactNode;
}

const RepositoriesList: React.FC<RepositoriesListProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ul className={ListStyleCss.listStyle}>{children}</ul>;
};

export default RepositoriesList;
