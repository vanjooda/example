import ListComponent from "../../components/products/ListComponent";

//상품 목록을 보여주는 파일

const ListPage = () => {
  return (
    <div>
      <div className="p-4 w-full bg-white">
        <div className="text-3xl font-extrabold">Products List Page</div>
      </div>
      <ListComponent />
    </div>
  );
};

export default ListPage;
