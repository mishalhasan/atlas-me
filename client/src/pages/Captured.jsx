import { useParams } from "react-router-dom";

function Captured() {
  const { username } = useParams();

  return <h1>{username}</h1>;
}

export default Captured;
