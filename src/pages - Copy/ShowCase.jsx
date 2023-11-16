import { useParams } from "react-router-dom";

const ShowCase = () => {
  const { id } = useParams();
  return <h1>Showcase /id</h1>;
};

export default ShowCase;
