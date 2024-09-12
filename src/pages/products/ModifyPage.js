import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/products/ModifyComponent";

const ModifyPage = () => {
  const { pno } = useParams(); // params(URL query string)에서 pno를 받아온다

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">Products ModifyPage</div>
      <ModifyComponent pno={pno} />
    </div>
  );
};

export default ModifyPage;
