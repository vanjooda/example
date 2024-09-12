//API 서버를 통해 전달받은 데이터는 목록만 아니라 페이징 처리에 필요한 모든 정보 같이 전달됨
//페이징은 현재 개발중인 기능이 아니여도 , 모든 목록 관련된 기능에서 사용해야함 = 공통의 컴포넌트로 제작해서 사용하는것이 유리함
//PageComponent는 ListComponent가 받아오는 서버의 데이터와 useCustomMove()에서 만들어진 moveToList()를 movePage 속성을 전달받도록 구성하고 활용함

const PageComponent = ({serverData, movePage}) => {

  return (
    <div className="m-6 flex justify-center">
       {serverData.prev ? <div className="m-2 p-2 w-16 text-center font-bold text-blue-400 " onClick={() => movePage({page:serverData.prevPage} )}> Prev </div> : <></>}

       {serverData.pageNumList.map(pageNum => 
       <div key={pageNum} className={ `m-2 p-2 w-12 text-center rounded shadow-md text-white ${serverData.current === pageNum? 'bg-gray-500':'bg-blue-400'}`} onClick={() => movePage( {page:pageNum})}> {pageNum} 
       </div>
  )}

       {serverData.next ? <div className="m-2 p-2 w-16 text-center font-bold text-blue-400" onClick={() => movePage( {page:serverData.nextPage})}> Next </div> : <></>}

  </div>
  );
}

export default PageComponent;